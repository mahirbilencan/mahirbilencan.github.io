#!/usr/bin/env python3
"""Enrich _bibliography/papers.bib with abstracts.

Sources, in priority order per entry:
  - arXiv API (entries with an arxiv field)
  - Cryptology ePrint Archive (entries whose html field points at eprint.iacr.org)
  - Crossref (entries with a doi field; abstracts are present for some publishers)

Run from repo root: python3 scripts/fetch_abstracts.py
Idempotent: entries that already have an abstract are left alone.
"""
import json
import re
import sys
import time
import urllib.request
try:
    import defusedxml.ElementTree as ET
except ImportError:
    import xml.etree.ElementTree as ET

BIB = "_bibliography/papers.bib"


def fetch(url, headers=None):
    req = urllib.request.Request(url, headers=headers or {"User-Agent": "papers-bib-enricher/1.0 (mailto:mcan@tulane.edu)"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")


def clean(text):
    text = re.sub(r"<jats:[^>]+>|</jats:[^>]+>|<[^>]+>", " ", text)
    text = text.replace("{", "").replace("}", "").replace("\\", "")
    text = re.sub(r"\s+", " ", text).strip()
    if text.lower().startswith("abstract"):
        text = text[len("abstract"):].lstrip(" :.")
    return text


def arxiv_abstracts(ids):
    out = {}
    url = "https://export.arxiv.org/api/query?id_list=" + ",".join(ids) + "&max_results=" + str(len(ids))
    body = fetch(url)
    if "<!DOCTYPE" in body or "<!ENTITY" in body:
        raise ValueError("unexpected DTD in arXiv API response")
    root = ET.fromstring(body)
    ns = {"a": "http://www.w3.org/2005/Atom"}
    for entry in root.findall("a:entry", ns):
        eid = entry.find("a:id", ns).text  # e.g. http://arxiv.org/abs/2012.10487v1
        m = re.search(r"abs/([^v]+(?:v\d+)?)", eid)
        summary = entry.find("a:summary", ns)
        if m is not None and summary is not None and summary.text:
            base = re.sub(r"v\d+$", "", m.group(1))
            out[base] = clean(summary.text)
    return out


def crossref_abstract(doi):
    try:
        data = json.loads(fetch(f"https://api.crossref.org/works/{doi}"))
        abs_ = data["message"].get("abstract")
        return clean(abs_) if abs_ else None
    except Exception:
        return None


def eprint_abstract(url):
    try:
        html = fetch(url)
        m = re.search(r'<p style="white-space: pre-wrap;">(.*?)</p>', html, re.S)
        return clean(m.group(1)) if m else None
    except Exception:
        return None


def main():
    src = open(BIB).read()
    entries = re.split(r"(?=^@)", src, flags=re.M)
    arxiv_ids = []
    for e in entries:
        if e.startswith("@") and "abstract" not in e:
            m = re.search(r"arxiv = \{([^}]+)\}", e)
            if m:
                arxiv_ids.append(m.group(1))
    arx = arxiv_abstracts(arxiv_ids) if arxiv_ids else {}
    time.sleep(1)

    added = {"arxiv": 0, "crossref": 0, "eprint": 0}
    out = []
    for e in entries:
        if not e.startswith("@") or "abstract = {" in e:
            out.append(e)
            continue
        abstract = None
        source = None
        m = re.search(r"arxiv = \{([^}]+)\}", e)
        if m and m.group(1) in arx:
            abstract, source = arx[m.group(1)], "arxiv"
        if abstract is None:
            m = re.search(r"html = \{(https://eprint\.iacr\.org[^}]+)\}", e)
            if m:
                abstract, source = eprint_abstract(m.group(1)), "eprint"
        if abstract is None:
            m = re.search(r"doi = \{([^}]+)\}", e)
            if m:
                abstract, source = crossref_abstract(m.group(1)), "crossref"
                time.sleep(0.5)
        if abstract:
            added[source] += 1
            key = re.match(r"@\w+\{([^,]+),", e).group(1)
            print(f"  + {key} ({source})", file=sys.stderr)
            e = re.sub(r"\n\}", f",\n  abstract = {{{abstract}}}\n}}", e, count=1)
            e = e.replace(",,\n  abstract", ",\n  abstract")
        out.append(e)

    open(BIB, "w").write("".join(out))
    print(f"done: {added}", file=sys.stderr)


if __name__ == "__main__":
    main()
