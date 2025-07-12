import React from 'react'
import '../style.css'

import lineImg from '../assets/images/line.png'
import smallLImg from '../assets/images/small_l.png'
import dotImg from '../assets/images/dot.png'

import suneImg from '../assets/images/sune.png'
import antiSuneImg from '../assets/images/anti_sune.png'
import hImg from '../assets/images/h.png'
import piImg from '../assets/images/pi.png'
import headlightsImg from '../assets/images/headlights.png'
import tImg from '../assets/images/t.png'
import bowtieImg from '../assets/images/bowtie.png'

import headlightsBackImg from '../assets/images/headlights_back.png'
import noHeadlightsImg from '../assets/images/no_headlights.png'

import uaPermImg from '../assets/images/ua_perm.png'
import ubPermImg from '../assets/images/ub_perm.png'
import zPermImg from '../assets/images/z_perm.png'
import hPermImg from '../assets/images/h_perm.png'

import algorithms from '../algorithms.json'

const algorithmImages = {
  "LINE": lineImg,
  "SMALL-L": smallLImg,
  "DOT": dotImg,
  "SUNE": suneImg,
  "ANTI-SUNE": antiSuneImg,
  "H": hImg,
  "Pi": piImg,
  "HEADLIGHTS": headlightsImg,
  "T": tImg,
  "BOWTIE": bowtieImg,
  "HEADLIGHTS-BACK": headlightsBackImg,
  "NO-HEADLIGHTS": noHeadlightsImg,
  "UA-PERM": uaPermImg,
  "UB-PERM": ubPermImg,
  "Z-PERM": zPermImg,
  "H-PERM": hPermImg
}

export default function AlgorithmSidebar({ onAlgorithmClick }) {
  return (
    <aside className="w-72 h-full bg-zinc-900 text-white shadow-lg border-r border-zinc-800 overflow-y-auto">
      <div className="p-4 space-y-6">
        {Object.entries(algorithms).map(([groupTitle, groupAlgos]) => (
          <div key={groupTitle}>
            <h2 className="mb-2 text-sm uppercase tracking-wider text-zinc-400 font-semibold">
              {groupTitle}
            </h2>
            <div className="space-y-2">
              {Object.entries(groupAlgos).map(([id, algorithmString]) => {
                const image = algorithmImages[id] || ''
                return (
                  <button
                    key={id}
                    onClick={() => onAlgorithmClick?.({ id, name: id, algorithm: algorithmString })}
                    className="flex items-center w-full gap-3 p-2 rounded-md bg-zinc-800/50 hover:bg-zinc-700/70 transition"
                  >
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium">{id}</div>
                      <div className="text-xs text-zinc-400">{algorithmString}</div>
                    </div>
                    <img
                      src={image}
                      alt={id}
                      loading="lazy"
                      className="w-14 h-14 object-contain rounded border border-zinc-700"
                    />
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
