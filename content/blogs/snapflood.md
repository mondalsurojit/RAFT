---
title: "Inside SnapFlood: turning every smartphone into a flood sensor"
excerpt: How a citizen-science app is building the fine-grained flood data cities have always lacked — one geotagged photo at a time.
date: Jun 2026
readingTime: 6 min read
author: RAFT
tags: Product
cover: /images/stock/snap-1.jpg
images: /images/stock/snap-1.jpg, /images/stock/snap-2.jpg, /images/stock/urban-flood.jpg
pinned: true
order: 1
---

Cities flood differently from rivers. A river basin can be watched with a handful of gauges; a city floods street by street, junction by junction, in ways that shift with every storm. The data needed to see that — where the water actually rose, how deep, and when — has never really existed at the resolution urban flood science needs.

**SnapFlood** is RAFT's answer to that gap: a citizen-science platform that turns the smartphone already in everyone's pocket into a real-time flood sensor.

## The data desert in plain sight

Traditional flood monitoring was built for rivers. Gauges sit on major channels, models are tuned to basin-scale flow, and forecasts are issued for stretches of a river. That approach works well where water is concentrated into a few large streams.

Urban flooding breaks the pattern. It is **pluvial** — driven by intense rain falling directly on a paved, poorly draining catchment — and it is fast and local. The fine-resolution rainfall and flood-flow data that would let us model it simply isn't collected at the street scale. Models end up calibrated on sparse observations, and warnings stay coarse.

## The idea: everyone is a sensor

People are everywhere a gauge is not. The moment a street waterlogs, somebody sees it. SnapFlood lets anyone capture and upload **geotagged photos and videos** of flooding, with a few simple pieces of metadata — city, area, an estimate of water depth, rainfall level, a short remark.

A single report is an anecdote. Thousands of reports, plotted together, become a living picture of where a city is flooding *right now* — and a research-ready archive of how it flooded before.

## How it works

SnapFlood is deliberately simple: a fast, free mobile app with no specialist hardware required. Behind that simplicity, every submission moves through five stages.

1. **Capture** — citizens submit geotagged photos and videos with lightweight metadata, through the app or a Google Form.
2. **Aggregate** — submissions flow into a real-time, global flood-data archive.
3. **Augment** — additional flood signals are extracted from social media to fill the gaps between reports.
4. **Feed UFIS** — the archive feeds the Urban Flood Information System's forecasting and modelling.
5. **Act** — outputs support research, engineering, policy and faster municipal response.

## Why the metadata matters

A photo alone is evocative; a photo with structure is *useful*. Three fields do most of the work:

- **Location** — automatic geotagging ties every submission to a precise point, so reports can be clustered and mapped.
- **Time** — when the observation was made, which lets reports be lined up against the rainfall that caused them.
- **Depth** — even a rough sense (ankle, knee, waist) turns a picture into a measurement a model can learn from.

Open contributions invite noise, so reports are most trustworthy when they can be cross-checked against rainfall data and against each other. The aim is signal, not volume.

## From reports to resilience

Aggregated reports do three jobs at once. They give residents a real-time view of their city, they give agencies situational awareness during an event, and they give researchers the ground-truth data needed to validate and improve forecasts.

That feedback loop — observe, model, improve — is what turns scattered photos into a system that gets a little better every monsoon.

## Try it

SnapFlood grew out of a Government of India DST-SPLICE (Climate Change Programme) project, with ongoing support from the AI CoE for Sustainable Cities. It is live today on the web, Google Play and the App Store.

[Explore SnapFlood](/products/snapflood) to see the platform in full — or read [Understanding urban flooding](/blog/understanding-urban-flooding) for the science behind why cities flood the way they do.
