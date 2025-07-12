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

// 🖼️ Bild-Zuordnung basierend auf ID
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
    <div className="sidenav">
      {Object.entries(algorithms).map(([groupTitle, groupAlgos]) => (
        <div key={groupTitle}>
          <div className="seperator">
            <h2>{groupTitle}</h2>
          </div>
          {Object.entries(groupAlgos).map(([id, algorithmString]) => {
            const image = algorithmImages[id] || '' // fallback falls kein Bild vorhanden

            return (
              <div
                key={id}
                className="flex items-center gap-4 p-2 border-b border-gray-700 hover:bg-gray-800 cursor-pointer"
                onClick={() =>
                  onAlgorithmClick?.({ id, name: id, algorithm: algorithmString })
                }
              >
                <div className="flex-1">
                  <h4 className="text-white">{id}</h4>
                  <h3 className="text-xs text-gray-400">{algorithmString}</h3>
                </div>
                <div className="shrink-0">
                  <img
                    src={image}
                    alt={id}
                    loading="lazy"
                    width="64"
                    height="64"
                    className="object-contain aspect-square w-16 h-16 rounded"
                  />
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
