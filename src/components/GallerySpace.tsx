/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  Bookmark, 
  X, 
  Globe2, 
  HelpCircle, 
  Layers, 
  Sparkles,
  Award,
  ArrowLeft,
  ArrowRight,
  Home,
  Maximize2,
  LayoutGrid
} from 'lucide-react';
import { CategoryId } from '../types';
import FloorCabinet from './FloorCabinet';
import GuestbookModal from './GuestbookModal';
import { OBJECTS_DATA, IMAGES_DATA, NOTES_DATA, FRAGMENTS_DATA, EXPERIMENTS_DATA } from '../data';

const dogSketch = (
  <svg className="w-16 h-8 opacity-75 mr-4" viewBox="0 0 100 50" fill="none" stroke="black" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 15 22 C 18 17 22 17 25 19 C 28 17 32 12 35 12 C 37 12 38 15 36 18 C 34 20 28 23 25 23" />
    <path d="M 25 23 C 26 26 20 35 20 37 Q 23 38 24 35 C 26 31 28 26 29 24" />
    <path d="M 31 24 C 32 27 28 35 27 37 Q 30 38 31 35 C 33 31 34 26 35 24" />
    <path d="M 35 18 C 45 19 55 19 65 21 C 70 22 72 20 74 17" />
    <path d="M 74 17 C 76 12 85 7 90 5 Q 91 7 88 10 C 84 14 78 19 75 22" />
    <path d="M 75 22 C 76 25 72 35 71 37 Q 74 38 74 35 C 76 31 77 25 77 23" />
    <path d="M 78 23 C 79 26 82 34 82 36 Q 85 37 85 34 C 84 31 83 26 82 23" />
    <path d="M 75 23 C 65 24 55 24 45 24 C 35 23 31 24 30 23" />
    <circle cx="17" cy="19" r="1.2" fill="black" stroke="none" />
    <path d="M 14 23 Q 16 24 18 22" />
    <text x="8" y="46" fontFamily="Georgia, serif" fontSize="7" fontStyle="italic" fill="#555">[ mon chef d'oeuvre ]</text>
  </svg>
);

const beeSketch = (
  <svg className="w-10 h-10 opacity-75" viewBox="0 0 80 80" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="40" cy="40" rx="5" ry="11" fill="none" />
    <path d="M 36 34 Q 40 35.5 44 34" strokeWidth="2.5" />
    <path d="M 35 40 Q 40 41.5 45 40" strokeWidth="2.5" />
    <path d="M 36 46 Q 40 47.5 44 46" strokeWidth="2.5" />
    <circle cx="40" cy="25" r="3.5" fill="black" />
    <path d="M 38 22 Q 36 17 32 16" />
    <path d="M 42 22 Q 44 17 48 16" />
    <path d="M 36 34 C 28 27 15 29 18 36 C 20 39 30 38 35 37" />
    <path d="M 44 34 C 52 27 65 29 62 36 C 60 39 50 38 45 37" />
    <path d="M 36 42 Q 22 46 24 51 Q 26 53 35 44" />
    <path d="M 44 42 Q 58 46 56 51 Q 54 53 45 44" />
    <text x="24" y="68" fontFamily="Georgia, serif" fontSize="8.5" fontStyle="italic" fill="#444">ut purpura</text>
  </svg>
);

const coffeeMugSketch = (
  <svg className="w-12 h-12 opacity-75" viewBox="0 0 100 100" fill="none" stroke="black" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 20 75 C 20 83 80 83 80 75" />
    <path d="M 25 75 Q 50 78 75 75" />
    <path d="M 32 45 L 35 70 C 36 73 64 73 65 70 L 68 45 Z" fill="none" />
    <ellipse cx="50" cy="45" rx="18" ry="4" fill="none" />
    <ellipse cx="50" cy="45" rx="14" ry="2.2" fill="none" strokeDasharray="2 2" />
    <path d="M 68 50 C 75 50 75 62 68 62" />
    <path d="M 45 35 Q 41 27 46 20" />
    <path d="M 53 35 Q 56 28 51 20" />
    <line x1="35" y1="58" x2="39" y2="58" />
    <line x1="36" y1="63" x2="38" y2="63" strokeDasharray="1 1" />
  </svg>
);

const spectaclesSketch = (
  <svg className="w-12 h-8 opacity-75" viewBox="0 0 100 50" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="32" cy="25" r="12" />
    <circle cx="68" cy="25" r="12" />
    <path d="M 44 21 Q 50 17 56 21" />
    <path d="M 20 25 Q 14 25 10 17" />
    <path d="M 80 25 Q 86 25 90 17" />
    <line x1="26" y1="19" x2="34" y2="29" strokeWidth="1" />
    <line x1="62" y1="19" x2="70" y2="29" strokeWidth="1" />
  </svg>
);

const deskPlantSketch = (
  <svg className="w-10 h-12 opacity-75" viewBox="0 0 80 100" fill="none" stroke="black" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 28 60 L 32 82 C 33 84 47 84 48 82 L 52 60 Z" />
    <ellipse cx="40" cy="60" rx="12" ry="3" />
    <path d="M 40 60 Q 40 33 26 18" />
    <path d="M 40 55 Q 48 37 58 24" />
    <path d="M 40 45 Q 36 28 44 14" />
    <path d="M 26 18 C 22 20 18 15 26 13 C 30 15 28 20 26 18" fill="none" />
    <path d="M 58 24 C 62 21 65 26 56 28 C 52 26 54 21 58 24" fill="none" />
    <line x1="34" y1="68" x2="37" y2="70" />
    <line x1="33" y1="74" x2="35" y2="75" />
  </svg>
);


interface ProjectCardMeta {
  name: string;
  type: string;
  plotArea: string;
  buildingArea: string;
  role: string;
  date: string;
  location: string;
  contribution: string;
}

const getProjectCardMetadata = (itemId: string, activeProjectItem: any, isEn: boolean): ProjectCardMeta => {
  const name = isEn ? activeProjectItem?.titleEn : activeProjectItem?.titleZh;

  switch (itemId) {
    case 'obj-f5':
      return {
        name: name || "Basaltic Espresso Station \"Thermal Trace\"",
        type: "Practical Work",
        plotArea: "4800m²",
        buildingArea: "8030m²",
        role: "Chief Designer",
        date: "09/2020-12/2021",
        location: isEn ? "Shanghai" : "上海",
        contribution: "Concept Design\\Graphic Presentation\\Coordination"
      };
    case 'obj-f2':
      return {
        name: name || "Steam-bent Plywood Chair \"Fold\"",
        type: "Practical Work / Furniture Design",
        plotArea: "350m²",
        buildingArea: "120m²",
        role: "Chief Designer",
        date: "09/2020-12/2021",
        location: isEn ? "Shanghai" : "上海",
        contribution: "Concept Design\\Ergonomics Testing\\Prototype Assembly"
      };
    case 'obj-f1':
      return {
        name: name || "Tactile Concrete Dial",
        type: "Exhibition Installation",
        plotArea: "N/A (Console)",
        buildingArea: "N/A",
        role: "Lead Craftsperson & Designer",
        date: "03/2024-05/2024",
        location: isEn ? "London, RCA" : "伦敦皇家艺术学院 (RCA)",
        contribution: "Material Cast\\Parametric Shadow Study\\Mould Design"
      };
    case 'obj-f3':
      return {
        name: name || "Ceramic Passive Amplifier",
        type: "Industrial Craft",
        plotArea: "N/A",
        buildingArea: "N/A",
        role: "Design Lead",
        date: "06/2023-11/2023",
        location: isEn ? "Jingdezhen" : "景德镇",
        contribution: "Acoustic Cavity Optimization\\Kiln Firing Coordination"
      };
    case 'obj-f4':
      return {
        name: name || "Woven Recycled Filament Shade",
        type: "Experimental Craft",
        plotArea: "2800m²",
        buildingArea: "950m²",
        role: "Chief Designer",
        date: "01/2022-08/2022",
        location: isEn ? "Hangzhou" : "杭州",
        contribution: "Filament Extrusion\\Computational Weaving Algorithm\\Assembly"
      };
    case 'obj-f6':
      return {
        name: name || "Eolian Sand Cast Vase \"Silt\"",
        type: "Commissioned Work",
        plotArea: "1200m²",
        buildingArea: "450m²",
        role: "Lead Sculptor",
        date: "12/2024-03/2025",
        location: isEn ? "Kubuqi Desert" : "库布齐沙漠",
        contribution: "Sand Mould Mixing\\Crucible Casting\\Chemical Patination"
      };
    case 'obj-f7':
      return {
        name: name || "Indigo Bio-Bamboo Partition \"Indigo Silence\"",
        type: "Collaborative Practice",
        plotArea: "3000m²",
        buildingArea: "1400m²",
        role: "Environmental Specialist",
        date: "04/2021-10/2021",
        location: isEn ? "Guizhou" : "贵州",
        contribution: "Indigo Fermentation\\Bamboo Lattice Subdivision\\Site Installation"
      };
    case 'obj-f8':
      return {
        name: name || (isEn ? "QUANTAN 31 CULTURAL CENTER" : "前滩 31 文演中心"),
        type: isEn ? "Hotel and Entertainment Complex Design" : "酒店、娱乐与文演综合体设计",
        plotArea: isEn ? "SEATS: 2500" : "大剧场座席: 2500座",
        buildingArea: "20,000 m²",
        role: isEn ? "Chief Designer at Neri&Hu" : "主创设计师at Neri&Hu",
        date: "11/2019-04/2022",
        location: isEn ? "Shanghai" : "上海",
        contribution: isEn 
          ? "Schematic Design\\DD Drawings\\Coordination\\FFE Design"
          : "方案设计\\扩初图纸\\各专业深化协调\\家具选型全链条设计"
      };
    case 'obj-f9':
      return {
        name: name || (isEn ? "HUAFANG DORMITORY RENOVATION" : "华纺小区改造"),
        type: isEn ? "Urban Renovation" : "城市更新 / 小区改造",
        plotArea: "4800 m²",
        buildingArea: "8030 m²",
        role: isEn ? "Chief Designer at Neri&Hu" : "主创设计师at Neri&Hu",
        date: "09/2020-12/2021",
        location: isEn ? "Shanghai" : "上海",
        contribution: isEn 
          ? "Concept Design\\Graphic Presentation\\Coordination"
          : "概念设计\\视觉呈现\\项目协调"
      };
    case 'obj-f10':
      return {
        name: name || (isEn ? "THE CULTURE CITY" : "文化都市"),
        type: isEn ? "Shenzhen Bay China Resources Cultural Plaza Interior Design" : "深圳湾华润文化广场空间室内设计",
        plotArea: isEn ? "N/A" : "无",
        buildingArea: "2000 m²",
        role: isEn ? "Chief Designer at AIM Architecture" : "主创设计师 at AIM Architecture",
        date: "03/2023-05/2023",
        location: isEn ? "Shenzhen" : "深圳",
        contribution: isEn 
          ? "Concept Design\\Graphic Presentation"
          : "概念设计\\视觉呈现"
      };
    case 'obj-f11':
      return {
        name: name || (isEn ? "NICCOLO PHUKET RESORT" : "尼依格罗普吉岛度假村"),
        type: isEn ? "Resort Design" : "度假村设计 // Resort Design",
        plotArea: "51100 m²",
        buildingArea: "19774 m²",
        role: isEn ? "Chief Designer at Neri&Hu" : "主创设计师 at Neri&Hu",
        date: "11/2020-10/2021",
        location: isEn ? "Phuket, Thailand" : "泰国普吉岛",
        contribution: isEn 
          ? "Concept Design\\Graphic Presentation\\Coordination"
          : "概念设计\\视觉呈现\\协调深化"
      };
    case 'obj-f12':
      return {
        name: name || (isEn ? "EAGLE+WEST TOWER" : "西鹰大厦"),
        type: isEn ? "Residential High-rise Design" : "高层住宅设计 // Residential High-rise Design",
        plotArea: "89030 m²",
        buildingArea: "110711 m²",
        role: isEn ? "Intern at OMA New York" : "设计实习生 at OMA New York",
        date: "06/2018-08/2018",
        location: isEn ? "Brooklyn, U.S." : "美国纽约布鲁克林",
        contribution: isEn 
          ? "Massing Study\\Model Making\\Logo Design\\Facade Study"
          : "体量研究\\模型制作\\标志设计\\外立面研究"
      };
    case 'obj-f13':
      return {
        name: name || "ZOOTOPIA",
        type: isEn ? "Community Facility Design" : "社区设施设计",
        plotArea: isEn ? "Undergraduate" : "大学本科",
        buildingArea: "Ching-Ling Huang",
        role: isEn ? "Individual" : "独立角色 / Individual",
        date: "03/2015-05/2015",
        location: isEn ? "Taipei" : "台北",
        contribution: isEn 
          ? "Environmental Coexistence Studio"
          : "环境和谐共生设计研究-独立完成"
      };
    case 'obj-f14':
      return {
        name: name || "MUSEUM ISLAND",
        type: isEn ? "Museum Design" : "博物馆设计",
        plotArea: isEn ? "Graduate" : "研究生阶段",
        buildingArea: "Mark Lee & Sharon Johnston",
        role: isEn ? "Individual" : "独立角色 / Individual",
        date: "02/2018-05/2018",
        location: isEn ? "Houston, U.S." : "美国休斯敦",
        contribution: isEn 
          ? "Exhibition & Timber Modularity Studio"
          : "建筑模块化体系与展陈流线研究-独立完成"
      };
    case 'obj-f15':
      return {
        name: name || "JOINTS",
        type: isEn ? "Public Housing Design" : "公共住宅设计",
        plotArea: isEn ? "Graduate" : "研究生阶段",
        buildingArea: "Alison Brooks",
        role: isEn ? "Individual" : "独立角色 / Individual",
        date: "09/2018-12/2018",
        location: isEn ? "London, U.K." : "英国伦敦",
        contribution: isEn 
          ? "Industry & Living Coevolution Study"
          : "新型居家办公与社区营造研究-独立完成"
      };
    case 'obj-f16':
      return {
        name: name || "HUB",
        type: isEn ? "High-rise Design" : "高层综合体设计",
        plotArea: isEn ? "Undergraduate" : "大学本科",
        buildingArea: "Yi Hong",
        role: isEn ? "Partner with Xin Zheng" : "合作设计 (Partner with Xin Zheng)",
        date: "09/2015-11/2015",
        location: isEn ? "Xiamen" : "厦门",
        contribution: isEn 
          ? "Site Analysis / Form / Diagr. / 3D / Render"
          : "场地分析、体量形体、图表绘制、三维建模与效果图渲染"
      };
    case 'obj-f17':
      return {
        name: name || "DIVERSE CITY",
        type: isEn ? "Urban Design" : "城市设计",
        plotArea: isEn ? "Undergraduate" : "大学本科",
        buildingArea: "Yaopeng Li",
        role: isEn ? "Partner with Xin Zheng" : "合作设计 (Partner with Xin Zheng)",
        date: "03/2016-05/2016",
        location: isEn ? "Xiamen" : "厦门",
        contribution: "Site Analysis\\Form Design\\Diagram Drawing\\Modeling\\Rendering"
      };
    default:
      const isImg = itemId.startsWith('img-');
      const isFrag = itemId.startsWith('frag-');
      const isNote = itemId.startsWith('note-');
      const isExp = itemId.startsWith('exp-');

      let type = "Theoretical Research";
      let plotArea = "N/A";
      let buildingArea = "N/A";
      let role = "Lead Researcher";
      let date = "2024-2025";
      let location = isEn ? "London" : "伦敦";
      let contribution = "Computational Synthesis\\Physical Specimen Archive\\Article Outline";

      if (isImg) {
        type = "Photographic Documentation";
        role = "Visual Archivist & Surveyor";
        date = "08/2024-11/2024";
        location = isEn ? "London / Desert Regions" : "伦敦 / 荒漠地带";
        contribution = "Chemical Silver Halide Development\\Light Angles Survey\\High-Macrophotography";
      } else if (isFrag) {
        type = "Material Recipe & Formula Catalog";
        role = "Materials Chemist & Coordinator";
        date = "01/2025-04/2025";
        location = isEn ? "RCA Materials Lab" : "RCA 材料实验室";
        contribution = "Viscosity Damping Analysis\\Formula Calibration\\Computational Layout Mapping";
      } else if (isNote) {
        type = "Curation Notebook & Theory Drafting";
        role = "Academic Curator / Concept lead";
        date = "03/2025-05/2025";
        location = isEn ? "Academic Archive Room" : "校内学术档案馆";
        contribution = "Theoretical Thesis Compilation\\Spatial Metaphor Blueprinting\\Curatorial Essay Drafting";
      } else if (isExp) {
        type = "WebGL & Web Audio Interactive Sandboxes";
        role = "Creative Technologist / Interaction Designer";
        date = "04/2026-present";
        location = isEn ? "Antigravity Dev Lab" : "数字媒介实验终端";
        contribution = "Poisson-equation Fluid Solving\\Multi-tone Resonance Oscillator Setup\\UI Interaction Engineering";
      }

      return {
        name: name || "Archival Study Item",
        type,
        plotArea,
        buildingArea,
        role,
        date,
        location,
        contribution
      };
  }
};

const getImageSpecificMetadata = (itemId: string, defaultDate: string, defaultLoc: string, isEn: boolean) => {
  if (itemId.startsWith('frag-')) {
    const idx = parseInt(itemId.replace('frag-f', '').replace('frag-', '')) - 1;
    const dbItem = FRAGMENTS_DATA[idx];
    if (dbItem) {
      const type = dbItem.type || (isEn ? "Academic Study at GSD" : "哈佛GSD学术设计研究");
      const date = dbItem.date || "2018.05";
      const location = isEn ? (dbItem.locationEn || "Cambridge, MA") : (dbItem.locationZh || "美国马萨诸塞州剑桥");
      const instructor = isEn ? (dbItem.instructorEn || "Andrew Witt") : (dbItem.instructorZh || "Andrew Witt");
      const medium = dbItem.partner || "";
      return { type, date, location, instructor, medium };
    }
  }

  if (itemId.startsWith('exp-')) {
    const idx = parseInt(itemId.replace('exp-f', '').replace('exp-', '')) - 1;
    const dbItem = EXPERIMENTS_DATA[idx >= 0 ? idx : 0];
    if (dbItem) {
      const type = dbItem.type || (isEn ? "Academic Study at GSD" : "哈佛GSD学术设计研究");
      const date = dbItem.date || "2019.05";
      const location = isEn ? (dbItem.locationEn || "Cambridge, MA") : (dbItem.locationZh || "美国马萨诸塞州剑桥");
      const instructor = isEn ? (dbItem.instructorEn || "Krzysztof Wodiczko") : (dbItem.instructorZh || "Krzysztof Wodiczko");
      const medium = dbItem.partner || "";
      return { type, date, location, instructor, medium };
    }
  }

  if (itemId.startsWith('note-')) {
    const idx = parseInt(itemId.replace('note-f', '').replace('note-', '')) - 1;
    const dbItem = NOTES_DATA[idx >= 0 ? idx : 0];
    if (dbItem) {
      const type = dbItem.category || (isEn ? "AI Coding & Simulation" : "AI 编程与模型仿真");
      const date = dbItem.date || "06/2026";
      const location = isEn ? "Virtual Space Digital Terminal" : "虚拟空间数字媒介终端";
      const instructor = "";
      const medium = isEn ? "Interactive Web Terminal // React" : "交互式网页设计终端 // React";
      return { type, date, location, instructor, medium };
    }
  }

  const lookupId = itemId.startsWith('img-f') ? itemId.replace('img-f', 'img-') : itemId;
  const dbItem = IMAGES_DATA.find(item => item.id === lookupId);

  let type = isEn ? "FINE ART PHOTOGRAPHY" : "艺术图像研究";
  let date = defaultDate || "2024.11";
  let location = defaultLoc || (isEn ? "Studio Vault" : "个人画廊展厅");
  let instructor = isEn ? "JINGYI BI (INDEPENDENT STUDY)" : "毕静怡 (独立创作)";
  let medium = isEn ? "Analog Silver Halide Capture" : "中画幅胶片黑白银盐印相";

  if (dbItem) {
    if (isEn) {
      if (dbItem.typeEn) type = dbItem.typeEn;
      if (dbItem.date) date = dbItem.date;
      if (dbItem.locationEn) location = dbItem.locationEn;
      if (dbItem.instructorEn) instructor = dbItem.instructorEn;
      if (dbItem.mediumEn) medium = dbItem.mediumEn;
      else if (dbItem.camera) medium = dbItem.camera;
    } else {
      if (dbItem.typeZh) type = dbItem.typeZh;
      if (dbItem.date) date = dbItem.date;
      if (dbItem.locationZh) location = dbItem.locationZh;
      if (dbItem.instructorZh) instructor = dbItem.instructorZh;
      if (dbItem.mediumZh) medium = dbItem.mediumZh;
      else if (dbItem.camera) medium = dbItem.camera;
    }
    return { type, date, location, instructor, medium };
  }

  if (itemId === 'img-f1' || itemId === 'img-1') {
    type = isEn ? "FINE ART PHOTOGRAPHY" : "风光与粗野水泥纪实";
    date = "2024.11";
    location = isEn ? "Narvik, Norway / Nordic border" : "挪威纳尔维克 / 北欧废墟边境";
    instructor = isEn ? "Jingyi Bi (Independent)" : "毕静怡 (独立创作)";
    medium = isEn ? "Linhof Technika V 4x5, Kodak T-Max 100" : "大画幅相机 4x5 银盐特制 / Kodak T-Max 100";
  } else if (itemId === 'img-f2' || itemId === 'img-2') {
    type = isEn ? "FINE ART PHOTOGRAPHY" : "室内静物与极简主义光影实验";
    date = "2025.02";
    location = isEn ? "London College Studio, UK" : "伦敦个人工作室 / 英国";
    instructor = isEn ? "Jingyi Bi (Independent)" : "毕静怡 (独立创作)";
    medium = isEn ? "Fujifilm GFX 100S, GF 80mm f/1.7" : "哈苏中画幅 / 柯达 Tri-X 400 胶片";
  } else if (itemId === 'img-f3' || itemId === 'img-3') {
    type = isEn ? "FINE ART PHOTOGRAPHY" : "微观材质学考察与肌理标本";
    date = "2024.08";
    location = isEn ? "Harvard GSD, Cambridge, Massachusetts" : "哈佛 GSD / 英国利物浦港口及造船厂码头";
    instructor = isEn ? "Ewa Harabasz" : "Ewa Harabasz";
    medium = isEn ? "Sony A7R V, FE 90mm f/2.8 Macro" : "微距特制镜头 / 柯达 T-Max 100 胶片";
  } else if (itemId === 'img-f4' || itemId === 'img-4') {
    type = isEn ? "FINE ART PHOTOGRAPHY" : "风积沙脊在清晨六点侧倾斜光下的抽象研究";
    date = "2024.12";
    location = isEn ? "Kubuqi Desert, Inner Mongolia" : "内蒙古库布齐沙漠";
    instructor = isEn ? "Jingyi Bi (Independent)" : "毕静怡 (独立创作)";
    medium = isEn ? "GFX 100S, GF 120mm f/4 Macro" : "富士中画幅特制微距镜头 120mm";
  } else if (itemId === 'img-f5' || itemId === 'img-5') {
    type = isEn ? "FINE ART PHOTOGRAPHY" : "粗野立面尺度刻痕与时间斑驳研究";
    date = "2025.01";
    location = isEn ? "Southbank Centre, London" : "伦敦南岸中心 / 英国";
    instructor = isEn ? "Jingyi Bi (Independent)" : "毕静怡 (独立创作)";
    medium = isEn ? "Hasselblad 503CX, Tri-X 400" : "哈苏 503CX 中画幅相机 / 柯达黑白卷";
  } else if (itemId === 'img-f6' || itemId === 'img-6') {
    type = isEn ? "Painting" : "绘画";
    date = "2025.06";
    location = isEn ? "Xiamen, Fujian" : "福建厦门";
    instructor = isEn ? "Jingyi Bi (Independent)" : "毕静怡 (独立创作)";
    medium = isEn ? "Textile Paint on Canvas, 14 × 13 cm" : "帆布 / 纺织涂料 14cm✖️13cm";
  } else if (itemId === 'img-f7' || itemId === 'img-7') {
    type = isEn ? "Painting" : "绘画";
    date = "2025.06";
    location = isEn ? "Xiamen, Fujian" : "福建厦门";
    instructor = isEn ? "Jingyi Bi (Independent)" : "毕静怡 (独立创作)";
    medium = isEn ? "Textile Paint on Canvas, 14 × 13 cm" : "帆布 / 纺织涂料 14cm✖️13cm";
  }

  return { type, date, location, instructor, medium };
};

const getItemDetails = (itemId: string) => {
  const isObj = itemId.startsWith('obj-');
  const isImg = itemId.startsWith('img-');
  const isFrag = itemId.startsWith('frag-');
  const isNote = itemId.startsWith('note-');
  const isExp = itemId.startsWith('exp-');

  let titleZh = "";
  let titleEn = "";
  let date = "2025.04";
  let descZh = "";
  let descEn = "";
  let specLabelZh = "";
  let specLabelEn = "";
  let specValue = "";
  let dimensions = "";
  let bulletsZh: string[] = [];
  let bulletsEn: string[] = [];

  if (isObj) {
    const lookupId = itemId.replace('obj-f', 'obj-');
    const dbItem = OBJECTS_DATA.find(item => item.id === lookupId) || OBJECTS_DATA[0];
    titleZh = dbItem.titleZh;
    titleEn = dbItem.titleEn;
    date = dbItem.date;
    descZh = dbItem.descriptionZh;
    descEn = dbItem.descriptionEn;
    specLabelZh = "材料细节 // 成分";
    specLabelEn = "Materials // Compound";
    specValue = dbItem.materialsEn + " / " + dbItem.materialsZh;
    dimensions = dbItem.dimensions || "300 × 300 × 40 mm";
    bulletsZh = dbItem.detailsZh || [];
    bulletsEn = dbItem.detailsEn || [];
  } 
  else if (isImg) {
    const lookupId = itemId.replace('img-f', 'img-');
    const dbItem = IMAGES_DATA.find(item => item.id === lookupId);
    const idx = parseInt(itemId.replace('img-f', '').replace('img-', '')) || 1;
    if (dbItem) {
      titleZh = dbItem.titleZh;
      titleEn = dbItem.titleEn;
      date = dbItem.date;
      descZh = dbItem.descriptionZh;
      descEn = dbItem.descriptionEn;
      specLabelZh = "理光/哈苏设备与感光参数";
      specLabelEn = "Camera Gear & Exposition";
      specValue = dbItem.camera;
      dimensions = dbItem.locationEn + " / " + dbItem.locationZh;
      bulletsZh = ["大画幅银盐胶片黑白颗粒感光记录", "物质性宏观立面肌理细密考察"];
      bulletsEn = ["Analogue large format silver halide capture", "High-fidelity micro-structural surface investigation"];
    } else {
      const fallbacks = [
        {
          titleZh: '沙脊立面光影几何',
          titleEn: 'Geometrics of Silt Wave',
          date: '2024.12',
          descZh: '微距风积沙脊在清晨六点侧倾斜光下的抽象剪裁。沙粒在风力重组下达到极限静止角（34°），在阴影与亮部的锐利交界处展现宛如3D渲染的极限像素颗粒。',
          descEn: 'Abstract layout framing eolian ripples under winter raking sunrise rays. Captured when dry silica particles rest at their physical repose angle of 34 degrees, drawing natural graphic gradients.',
          camera: 'GFX 100S, GF 120mm f/4 Macro, f/8, 1/125s',
          location: 'Kubuqi Desert / 库布齐沙漠',
        },
        {
          titleZh: '粗野立面尺度刻痕',
          titleEn: 'Brutalist Structural Facade',
          date: '2025.01',
          descZh: '粗糙剔凿混凝土在细微逆光下的颗粒化表达。大画幅银盐胶片的丰富灰调记录了上世纪六十年代木模板拆除后留下的粗野木纹肌理印迹，展现坚硬材质由于时间折旧遗留的高对比斑驳。',
          descEn: 'A dense medium-format capture surveying Southbank structural wood-grained imprints. Strong backlighting details classic board-marked checks and continuous atmospheric carbon staining.',
          camera: 'Hasselblad 503CX, CF 80mm f/2.8, Kodak Tri-X 400',
          location: 'Southbank Centre, London / 伦敦',
        },
        {
          titleZh: '无机光线对话',
          titleEn: 'Inorganic Light & Shadow',
          date: '2025.03',
          descZh: '当阳光透过三号展厅双面折射器，投射在水洗沙墙壁上的静止光轨。这些折线随着云层的移动缓慢偏转，在空间内画出一道富有诗意的无感日轮。',
          descEn: 'Captures refracted shafts projected across washed pebble panels at the RCA Show. Under slow clouds, the geometric rays rotate in absolute silence, serving as an atmospheric dial.',
          camera: 'Fujifilm X-T5, XF 33mm f/1.4 R, 1/250s',
          location: 'Museum Darwin Building / 达尔文展厅',
        },
        {
          titleZh: '表面肌理标本图像',
          titleEn: 'Textured Specimen Layout',
          date: '2024.09',
          descZh: '一幅关于各类无机耐磨骨料拼贴板的微距黑白纪实。将火山灰、铸铝砂和松木松脂熔凝点排列，形成一幅兼具理智主义与物质温存的肌理标本图册。',
          descEn: 'Black-and-white macro index archiving inorganic aggregate binders. Captures fine slate grit, raw basalt slates, and vitrified pine resin drops arranged as a study on physical noise patterns.',
          camera: 'Sony A7R V, FE 50mm f/2.8 Macro',
          location: 'Studio Basement / 个人工作室',
        }
      ];
      const fIdx = (idx - 3) % fallbacks.length;
      const fItem = fallbacks[fIdx >= 0 ? fIdx : 0];
      titleZh = fItem.titleZh;
      titleEn = fItem.titleEn;
      date = fItem.date;
      descZh = fItem.descZh;
      descEn = fItem.descEn;
      specLabelZh = "抓拍相机和光圈";
      specLabelEn = "Capture Gear & Setup";
      specValue = fItem.camera;
      dimensions = fItem.location;
      bulletsZh = ["大镜组微距对焦", "时间斑驳的光学与化学还原"];
      bulletsEn = ["Macro focal length optical indexing", "Chemical silver halide tone mapping"];
    }
  } 
  else if (isFrag) {
    const idx = parseInt(itemId.replace('frag-f', '').replace('frag-', '')) - 1;
    const dbItem = FRAGMENTS_DATA[idx];
    if (dbItem) {
      titleZh = dbItem.titleZh;
      titleEn = dbItem.titleEn;
      date = dbItem.date || "2018.05";
      descZh = dbItem.contentZh;
      descEn = dbItem.contentEn;
      specLabelZh = "成果//参数";
      specLabelEn = "Output & Specs";
      specValue = dbItem.metadata || "";
      dimensions = dbItem.locationEn || "Cambridge, Massachusetts";
      bulletsZh = ["大机组概念方案设计", "形式构成与学术课题探讨"];
      bulletsEn = ["Conceptual design and form studies", "Academic exploration and architectural study"];
    } else {
      const fallbacks = [
        {
          titleZh: '玄武劈裂面金箔斑驳试验',
          titleEn: 'Basaltic Gold Leaf Interlock',
          metadata: 'Purity: 98.4% Gold // 24K Leaf',
          contentZh: '在粗糙的火山质玄武角砾岩上贴覆极细微古法金箔的触觉试验。金箔在重度摩擦力的挤压下嵌入火山岩多孔孔洞中，亮面金黄与暗调火山玄武形成强烈的肌理对立，如同一幅时间的遗迹。',
          contentEn: 'A material friction test pressing gold leaf fragments into carbonized basalt rocks. This interlock bridges fragile metallic lusters with timeless, rugged volcanic minerals.'
        },
        {
          titleZh: '金泽手作工坊打磨拼板随记',
          titleEn: 'Kanazawa Jointery Friction Log',
          metadata: 'No. 12 // Kyoto Hinoki joinery',
          contentZh: '详尽记录桧木多重燕尾榫（Dovetail Joinery）在砂纸不同级数（240目至1200目）打磨下阻尼力的反馈。通过记录打磨动作中手部肌肉的阻力坐标，分析工匠触觉记忆的数码映射精度。',
          contentEn: 'An archiving entry tracking the hand-friction variables when planed cypress wood joineries are scrubbed under 240-to-1200 grit. Synthesises hand-muscle resistance variables into mechanical feedback.'
        },
        {
          titleZh: '天然无机矿物颜料发酵干涉',
          titleEn: 'Raw Minerals Ochre Sieve',
          metadata: 'pH: 6.8 // Ferrous fermentation',
          contentZh: '以赭石、蛤粉、松脂为天然颜料，在24天温控厌氧发酵中对颗粒度的化学演变追踪。该颜料涂抹于宣纸一瞬能产生不均匀、有微小晶体矿物折光的亚光哑面，富有极高的诗意物性。',
          contentEn: 'Traces mineral grain transformations inside an anaerobic red-ochre fermentation basin. The resulting paste dries with unpolished micro-cavities that glint under moving natural light.'
        },
        {
          titleZh: '亚麻原丝多孔结构配比板',
          titleEn: 'Linen Fiber Dynamic Compaction',
          metadata: 'Density: 1.12 g/cm³ // Flax',
          contentZh: '实验性多孔声学吸音板材的开发样板。将法国天然亚麻废丝与马铃薯改性淀粉基胶进行高压热合，在阻燃的同时保留了亚麻纤维多向多孔的网状吸能孔穴，触感干松温暖，声学阻阻尼系数高。',
          contentEn: 'A tactile architectural acoustic panel specimen. Blends non-processed raw flax fibres with modified cornstarch resins under high hot-pressing loads, forming an open-pore sponge layer that feels beautifully airy.'
        }
      ];
      const fIdx = (idx - 4) % fallbacks.length;
      const fItem = fallbacks[fIdx >= 0 ? fIdx : 0];
      titleZh = fItem.titleZh;
      titleEn = fItem.titleEn;
      date = "2025.03";
      descZh = fItem.contentZh;
      descEn = fItem.contentEn;
      specLabelZh = "实验材料指标";
      specLabelEn = "Material Index";
      specValue = fItem.metadata;
      dimensions = "LAB // NO." + idx;
      bulletsZh = ["手工材料混合化学配比记录", "触觉信息数据化拟真参数"];
      bulletsEn = ["Manual raw compound blend formulation analysis", "Tactile information parameters digitized limits"];
    }
  } 
  else if (isNote) {
    const idx = parseInt(itemId.replace('note-f', '')) - 1;
    const dbItem = NOTES_DATA[idx];
    if (dbItem) {
      titleZh = dbItem.titleZh;
      titleEn = dbItem.titleEn;
      date = dbItem.date;
      descZh = dbItem.contentZh;
      descEn = dbItem.contentEn;
      specLabelZh = "思考随笔门类";
      specLabelEn = "Reflection Field";
      specValue = dbItem.category + " // " + dbItem.readTime;
      dimensions = "Academic Journal // 学术手稿";
      bulletsZh = ["探讨屏幕玻璃对物理重力的消解", "收录于毕静怡毕业设计理念札记"];
      bulletsEn = ["Investigating standard screen flat action flattening", "Featured under Jingyi's RCA degree compilation"];
    } else {
      const fallbacks = [
        {
          titleZh: '重力阻尼模拟与摩擦坐标拓扑图',
          titleEn: 'Theoretical Damping Diagrams',
          date: '2025.05',
          category: 'Research / 研究',
          contentZh: '在网页中计算手指滑过卡片时的物理惯性阻力。通过建立一个牛顿流体层流阻尼方程，让卡片的移动带有一种接近物理实体的“粘滞感”和“厚重感”，从而拉开与常规闪电弹窗的视觉质感差距。',
          contentEn: 'Maps local skin slide motions to physical laminar shear equations under virtual fluid dynamics. Upgrading standard responsive triggers with realistic mass inertia frames creates an aesthetic weight.'
        },
        {
          titleZh: '皇家设计名录审查推荐信副本',
          titleEn: 'Vanguard Craftsmanship Certificate',
          date: '2025.06',
          category: 'Curation / 策展报告',
          contentZh: '《Tactile Dial》获得皇家设计名录（RCA Show）全场前沿工艺推荐奖的学术简评副本。肯定了设计师在“消解纯平屏幕玻璃无机霸权，回归古老生活重力坐标”方向的突破。',
          contentEn: 'The official academic review of "Tactile Dial" graduation project at London Design Festival. Validates the research initiative that successfully counteracts screen capillary glass flattening.'
        },
        {
          titleZh: '屏幕物理交互设计参考文献书录',
          titleEn: 'Tactile Interface Thesis Reference Books',
          date: '2025.03',
          category: 'Bibliography / 书目',
          contentZh: '精选与毕静怡毕业学术论文、界面物性研究有关的德、法、日三文经典藏书目。涵盖马丁·海德格尔《存在与时间》中的“用之物”观点，以及日本柳宗悦《工艺文化》中对天然器物“自发温存”的考究。',
          contentEn: 'A curated reading list supporting material interface designs, spanning Heidegger’s discussion on physical handy tools ("Zuhanden") to Soetsu Yanagi’s classic craft essays on the warmth of daily ceramics.'
        },
        {
          titleZh: '手提重自感咖啡压粉器原型制图',
          titleEn: 'Physical Products Layout Drafting',
          date: '2025.01',
          category: 'Drafting / 图纸',
          contentZh: '火山石咖啡压粉器《热迹》的草稿图纸与底盘配重平衡重心设计说明。展示了如何在3.5公斤的玄武研磨台中央，通过引入50g的偏心底托空腔，获得完美的握柄捣重比。',
          contentEn: 'The mechanical CAD blueprint of "Thermal Trace" portafilter holder. Illustrates the center of mass calibration curve and hand-grip ergonomics supporting flat solid downward pressure with zero wobble.'
        },
        {
          titleZh: '3号数字展厅触觉隐喻策展大纲',
          titleEn: 'Exhibition Curation Journal Log',
          date: '2026.04',
          category: 'Curation / 策展',
          contentZh: '关于3号大理石展台布局、灯光仰角、及声音共振扬声器在陈列柜下座埋设方位的日记草图。设计了一套观众拉开抽屉的幅度与展厅内赫兹磬声深度完全线型关联的机制。',
          contentEn: 'Layout sketches plotting gallery lighting angles and sub-cabinet Web Audio amplifier positions. Designs a mechanical experience where pulling distance tunes ambient sound decays.'
        }
      ];
      const fIdx = (idx - 2) % fallbacks.length;
      const fItem = fallbacks[fIdx >= 0 ? fIdx : 0];
      titleZh = fItem.titleZh;
      titleEn = fItem.titleEn;
      date = fItem.date;
      descZh = fItem.contentZh;
      descEn = fItem.contentEn;
      specLabelZh = "手记范畴";
      specLabelEn = "Curation Essay Category";
      specValue = fItem.category + " // RCA Library Code";
      dimensions = "THEORETICAL DRAFT / 手记草案";
      bulletsZh = ["探索屏幕物理阻泥学", "建立空间与器物的触感桥梁"];
      bulletsEn = ["Explores physical screen friction resistance coefficients", "Establishes a visceral dialogue between viewers and relics"];
    }
  } 
  else if (isExp) {
    const idx = parseInt(itemId.replace('exp-f', '').replace('exp-', '')) - 1;
    const dbItem = EXPERIMENTS_DATA[idx >= 0 ? idx : 0];
    if (dbItem) {
      titleZh = dbItem.titleZh;
      titleEn = dbItem.titleEn;
      date = dbItem.date;
      descZh = dbItem.descriptionZh;
      descEn = dbItem.descriptionEn;
      specLabelZh = "研究与媒介门类";
      specLabelEn = "Research & Media Class";
      specValue = dbItem.type;
      dimensions = "Harvard GSD ｜ 哈佛大学GSD";
      bulletsZh = [
        dbItem.partner ? `合作参与设计: ${dbItem.partner}` : "独立学术成果展陈",
        dbItem.instructorZh ? `学术导师: ${dbItem.instructorZh}` : "哈佛大学GSD学术研究"
      ];
      bulletsEn = [
        dbItem.partner ? `Partner collaborator: ${dbItem.partner}` : "Solo academic investigation",
        dbItem.instructorEn ? `Instructor: ${dbItem.instructorEn}` : "Harvard GSD design archives"
      ];
    } else {
      const fallbacks = [
        {
          titleZh: '全数字算法实时声响发生器控制盘',
          titleEn: 'Temple Bell Sine Waves Synthesis',
          contentZh: '一个利用 Web Audio 合成器算法调配寺庙磬钟回响与干燥木鱼短击音的数字化交互控制。通过在二维平面上拖拽坐标，能任意拉长声音空谷共鸣，呈现完美的算法数码声响拟态。',
          contentEn: 'An interactive soundscape console mapping digital sine wave modulations to real acoustical bell shapes. Dragging nodes updates multi-band decay and resonance levels for clean and heavy sound simulation.'
        },
        {
          titleZh: '重力势能交互网格几何干涉实验',
          titleEn: 'Procedural Gravity Fields Interference',
          contentZh: '通过 3D 浮雕网格和引引力点移动，重构带有弹性阻尼的回弹曲线交互。可看到鼠标在网页上摩擦过时，平面织物会产生如同微风吹拂丝帕般的物理震荡波，并在 0.8 秒内平息。',
          contentEn: 'A WebGL responsive mesh study mapping virtual gravity pull vectors to elastic spring membranes. Triggers soft surface ripples resembling breeze-blown linen across a physical tablet.'
        },
        {
          titleZh: 'WebGL 无阻尼水体粒子波前流动',
          titleEn: 'WebGL Kinetic Water Ripple Wavefront',
          contentZh: '一个全屏交互式轻量 WebGL 波动粒子网格。采用实时浅水方程算法，使用户在触摸屏幕或点击各格时，激发起层层无阻尼衰减的透射性微波，折射底层图样，带来逼真的数字清凉触感。',
          contentEn: 'An interactive shallow-water simulation solving fluid conservation equations on a 2D particle mesh in real-time. Tapping triggers double-curved optical ripples over the gallery canvas.'
        },
        {
          titleZh: '共振钟磐物理声块分布矩阵',
          titleEn: 'Ambient Resonator Hertz Oscilloscope',
          contentZh: '将物理钟罩在特定音频冲击下的共振频率（256Hz、512Hz）分布映射为一幅流动的沙画颗粒图。在交互中可以通过调整“吸音率”来看到颗粒沙盘随声音起伏结晶为完美的克拉尼图形。',
          contentEn: 'Visualizes Chladni resonant frequencies mapping 256Hz wave peaks to virtual sand clusters. Dragging frequencies shapes sand dunes on screen, translating sound to geo-graphics.'
        },
        {
          titleZh: '多孔材料气孔分布噪声计算模型',
          titleEn: 'Porous Noise Height-Map Sandbox',
          contentZh: '用于计算吸音建材中超细纤维空腔排列的随机二维随机波（Perlin Noise）发生器。能让用户自定义多孔率、随机密度与压力变形，分析物理噪音的降噪系数参数曲线。',
          contentEn: 'A parametric sandbox calculating random Perlin noise fields to layout cellular acoustic matrices. Users customize porosity rates and compression factors to audit absorption values.'
        }
      ];
      const fIdx = (idx - 2) % fallbacks.length;
      const fItem = fallbacks[fIdx >= 0 ? fIdx : 0];
      titleZh = fItem.titleZh;
      titleEn = fItem.titleEn;
      date = "2026.04";
      descZh = fItem.contentZh;
      descEn = fItem.contentEn;
      specLabelZh = "实验计算架构";
      specLabelEn = "Math Architecture";
      specValue = "Partial Differential Equation Solver // 偏微分方程解算";
      dimensions = "WebGL Dynamic Sandbox";
      bulletsZh = ["可实时调整介质摩擦力与声响黏滞系数", "点击或滑动指针体验算法即时演绎物性特征"];
      bulletsEn = ["Tweak fluid friction damping levels in real-time", "Click or scrub pointer to experience real-time physical noise modeling"];
    }
  }

  return {
    titleZh,
    titleEn,
    date,
    descZh,
    descEn,
    specLabelZh,
    specLabelEn,
    specValue,
    dimensions,
    bulletsZh,
    bulletsEn
  };
};

const getDatabaseItemById = (itemId: string): any => {
  if (itemId.startsWith('obj-')) {
    const lookupId = itemId.startsWith('obj-f') ? itemId.replace('obj-f', 'obj-') : itemId;
    return OBJECTS_DATA.find(item => item.id === lookupId) || null;
  } else if (itemId.startsWith('img-')) {
    const lookupId = itemId.startsWith('img-f') ? itemId.replace('img-f', 'img-') : itemId;
    return IMAGES_DATA.find(item => item.id === lookupId) || null;
  } else if (itemId.startsWith('frag-')) {
    const idx = parseInt(itemId.replace('frag-f', '')) - 1;
    return !isNaN(idx) ? FRAGMENTS_DATA[idx] : null;
  } else if (itemId.startsWith('note-')) {
    const idx = parseInt(itemId.replace('note-f', '')) - 1;
    return !isNaN(idx) ? NOTES_DATA[idx] : null;
  } else if (itemId.startsWith('exp-')) {
    const idx = parseInt(itemId.replace('exp-f', '')) - 1;
    return !isNaN(idx) ? EXPERIMENTS_DATA[idx] : null;
  }
  return null;
};

const getProjectImages = (itemId: string, mainImage: string): string[] => {
  const dbItem = getDatabaseItemById(itemId);
  if (dbItem && dbItem.galleryImages && dbItem.galleryImages.length > 0) {
    return dbItem.galleryImages;
  }

  const result = [mainImage];
  if (itemId.startsWith('obj-')) {
    if (itemId === 'obj-f1') {
      result.push(
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600"
      );
    } else if (itemId === 'obj-f2') {
      result.push(
        "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600"
      );
    } else if (itemId === 'obj-f3') {
      result.push(
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=600"
      );
    } else if (itemId === 'obj-f4') {
      result.push(
        "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600"
      );
    } else if (itemId === 'obj-f5') {
      result.push(
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600"
      );
    } else if (itemId === 'obj-f6') {
      result.push(
        "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600"
      );
    } else if (itemId === 'obj-f7') {
      result.push(
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600"
      );
    } else if (itemId === 'obj-f8') {
      result.push(
        "https://i.postimg.cc/9XNF8w5s/1.jpg",
        "https://i.postimg.cc/1RY5CVhN/2.jpg",
        "https://i.postimg.cc/xqVN7XJ5/3.jpg",
        "https://i.postimg.cc/GfRP6gyc/4.jpg",
        "https://i.postimg.cc/ZKCqtMRW/5.jpg",
        "https://i.postimg.cc/bvK99wYG/6.jpg",
        "https://i.postimg.cc/JnZc6Ctj/7.jpg",
        "https://i.postimg.cc/FKHDFHG0/8.jpg",
        "https://i.postimg.cc/28mxMn87/9.png"
      );
    } else {
      result.push(
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600"
      );
    }
  } else if (itemId.startsWith('img-')) {
    if (itemId === 'img-f1') {
      result.push(
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600"
      );
    } else if (itemId === 'img-f2') {
      result.push(
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1595908129746-57ca1a63dd4d?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600"
      );
    } else if (itemId === 'img-f3') {
      result.push(
        "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600"
      );
    } else if (itemId === 'img-f4') {
      result.push(
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600"
      );
    } else {
      result.push(
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600"
      );
    }
  } else if (itemId.startsWith('frag-')) {
    // For fragments, do not append any random placeholder images. Only use specified ones or mainImage.
  } else if (itemId.startsWith('note-')) {
    if (itemId !== 'note-f1') {
      result.push(
        "https://images.unsplash.com/photo-1515564730053-fc3f78a0c562?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600"
      );
    }
  } else if (itemId.startsWith('exp-')) {
    result.push(
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600"
    );
  } else {
    result.push(
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600"
    );
  }
  return result;
};

const getProjectImagesById = (itemId: string): string[] => {
  let mainImage = "";
  
  if (itemId.startsWith('obj-')) {
    const lookupId = itemId.startsWith('obj-f') ? itemId.replace('obj-f', 'obj-') : itemId;
    const dbItem = OBJECTS_DATA.find(item => item.id === lookupId);
    mainImage = dbItem ? dbItem.image : "";
  } else if (itemId.startsWith('img-')) {
    const lookupId = itemId.startsWith('img-f') ? itemId.replace('img-f', 'img-') : itemId;
    const dbItem = IMAGES_DATA.find(item => item.id === lookupId);
    mainImage = dbItem ? dbItem.image : "";
  } else if (itemId.startsWith('frag-')) {
    const idx = parseInt(itemId.replace('frag-f', '')) - 1;
    if (!isNaN(idx)) {
      const dbItem = FRAGMENTS_DATA[idx];
      mainImage = dbItem ? (dbItem as any).image || "" : "";
    }
  } else if (itemId.startsWith('note-')) {
    const idx = parseInt(itemId.replace('note-f', '')) - 1;
    if (!isNaN(idx)) {
      const dbItem = NOTES_DATA[idx];
      mainImage = dbItem ? (dbItem as any).image || "" : "";
    }
  } else if (itemId.startsWith('exp-')) {
    const idx = parseInt(itemId.replace('exp-f', '')) - 1;
    if (!isNaN(idx)) {
      const dbItem = EXPERIMENTS_DATA[idx];
      mainImage = dbItem ? (dbItem as any).image || "" : "";
    }
  }

  // Fallbacks corresponding to category drawer layout main images
  const fallbackImages: Record<string, string> = {
    'frag-f1': 'https://i.postimg.cc/TPSVHVWr/20250504-portfolio.jpg',
    'frag-f2': 'https://i.postimg.cc/mr5rYV1p/20170929-IMG-1709.jpg',
    'frag-f3': 'https://i.postimg.cc/XqF3PHfS/wei-xin-tu-pian-20260604161226-8555-46.jpg',
    'frag-f4': 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800',
    'frag-f5': 'https://images.unsplash.com/photo-151351245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800',
    'frag-f6': 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80&w=800',
    'frag-f7': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    'note-f1': 'https://images.unsplash.com/photo-1516962215328-219b661d152c?auto=format&fit=crop&q=80&w=800',
    'note-f2': 'https://i.postimg.cc/qq4VngVW/Screen-Shot-2026-06-11-150018-875.jpg',
    'note-f3': 'https://images.unsplash.com/photo-1532012164546-f432f2c3edd0?auto=format&fit=crop&q=80&w=800',
    'note-f4': 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    'note-f5': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
    'note-f6': 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800',
    'note-f7': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800',
    'exp-f1': 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=800',
    'exp-f3': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    'exp-f4': 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800',
    'exp-f5': 'https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&q=80&w=800',
    'exp-f6': 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=800',
    'exp-f7': 'https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&q=80&w=800'
  };

  if (!mainImage) {
    mainImage = fallbackImages[itemId] || "";
  }

  return getProjectImages(itemId, mainImage);
};

const getProjectCategoryLabel = (activeCategoryId: string, isEn: boolean): string => {
  if (activeCategoryId === 'objects') {
    return isEn ? "PRODUCT & OBJECT DESIGN" : "实体器物与艺术家具陈设";
  }
  if (activeCategoryId === 'images') {
    return isEn ? "FINE ART PHOTOGRAPHY" : "意境图像与巨幅视觉研究";
  }
  if (activeCategoryId === 'fragments') {
    return isEn ? "TACTILE MATERIAL SAMPLE" : "触觉碎屑与无机物性配方";
  }
  if (activeCategoryId === 'notes') {
    return isEn ? "THEORETICAL ESSAY & NOTE" : "实践手记与学术反思存档";
  }
  if (activeCategoryId === 'experiments') {
    return isEn ? "INTERACTIVE COMPONENT SYSTEM" : "生成式数控与实时声响实验";
  }
  return isEn ? "GALLERY EXPERIMENT" : "画廊媒介实践";
};

interface GallerySpaceProps {
  onOpenDrawer: (id: CategoryId) => void;
  activeCategoryId?: CategoryId | null;
  onCloseDrawer?: () => void;
  isEn: boolean;
  onToggleLang: () => void;
}

export default function GallerySpace({ 
  onOpenDrawer, 
  activeCategoryId = null, 
  onCloseDrawer, 
  isEn, 
  onToggleLang 
}: GallerySpaceProps) {
  const [activeBookletId, setActiveBookletId] = useState<string | null>(null);
  const [isGuestbookOpen, setIsGuestbookOpen] = useState<boolean>(false);
  const [pulledDrawerId, setPulledDrawerId] = useState<CategoryId | null>(null);
  const [hoveredRecordIndex, setHoveredRecordIndex] = useState<number | null>(null);
  const [cardZIndices, setCardZIndices] = useState<Record<string, number>>({});
  const [selectedProjectItemId, setSelectedProjectItemId] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [zoomedImageUrl, setZoomedImageUrl] = useState<string | null>(null);
  const [areThumbnailsStacked, setAreThumbnailsStacked] = useState<boolean>(true);

  React.useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProjectItemId]);
  const constraintsRef = React.useRef<HTMLDivElement>(null);

  // Auto-reset project sketchbook selection and stack state when category drawer is opened/closed
  React.useEffect(() => {
    if (!activeCategoryId) {
      setSelectedProjectItemId(null);
    } else {
      setAreThumbnailsStacked(true);
    }
  }, [activeCategoryId]);

  // Escape & Arrow listener to close drawer or close detail sketchbook state, or navigate zoomed images
  React.useEffect(() => {
    if (!activeCategoryId) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoomedImageUrl) {
          setZoomedImageUrl(null);
        } else if (selectedProjectItemId) {
          setSelectedProjectItemId(null);
        } else {
          onCloseDrawer?.();
        }
      } else if (e.key === 'ArrowRight' && zoomedImageUrl && selectedProjectItemId) {
        const list = getProjectImagesById(selectedProjectItemId);
        const idx = list.indexOf(zoomedImageUrl);
        if (idx !== -1 && list.length > 1) {
          setZoomedImageUrl(list[(idx + 1) % list.length]);
        }
      } else if (e.key === 'ArrowLeft' && zoomedImageUrl && selectedProjectItemId) {
        const list = getProjectImagesById(selectedProjectItemId);
        const idx = list.indexOf(zoomedImageUrl);
        if (idx !== -1 && list.length > 1) {
          setZoomedImageUrl(list[(idx - 1 + list.length) % list.length]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCategoryId, selectedProjectItemId, zoomedImageUrl, onCloseDrawer]);

  const bringToFront = (id: string) => {
    setCardZIndices(prev => {
      const values = Object.values(prev) as number[];
      const maxZ = values.length > 0 ? Math.max(...values, 35) : 35;
      return {
        ...prev,
        [id]: maxZ + 1
      };
    });
  };

  // Custom tailored organic photo assets per category, scattered in varying shapes, proportions, with absolute zero borders and zero shadows
  const CATEGORY_ITEMS: Record<CategoryId, Array<{
    id: string;
    image: string;
    titleEn: string;
    titleZh: string;
    widthClass: string;
    heightClass: string;
    left: string;
    top: string;
    rotate: number;
    delay: number;
  }>> = {
    objects: [
      {
        id: 'obj-f8',
        image: OBJECTS_DATA.find(x => x.id === 'obj-8')?.image || 'https://i.postimg.cc/jSnWQQDc/cover.jpg',
        titleEn: 'QUANTAN 31 CULTURAL CENTER',
        titleZh: '前滩 31 文演中心',
        widthClass: 'w-42 sm:w-52',
        heightClass: 'h-28 sm:h-36',
        left: '6%',
        top: '12%',
        rotate: -8,
        delay: 0.05
      },
      {
        id: 'obj-f9',
        image: OBJECTS_DATA.find(x => x.id === 'obj-9')?.image || 'https://i.postimg.cc/DyZ2kr35/20211216-Birdeye.jpg',
        titleEn: 'HUAFANG DORMITORY RENOVATION',
        titleZh: '华纺小区改造',
        widthClass: 'w-42 sm:w-50',
        heightClass: 'h-28 sm:h-34',
        left: '28%',
        top: '16%',
        rotate: 6,
        delay: 0.12
      },
      {
        id: 'obj-f10',
        image: OBJECTS_DATA.find(x => x.id === 'obj-10')?.image || 'https://i.postimg.cc/wvTL4XdL/2-1.jpg',
        titleEn: 'THE CULTURE CITY',
        titleZh: '文化都市',
        widthClass: 'w-42 sm:w-50',
        heightClass: 'h-28 sm:h-34',
        left: '50%',
        top: '10%',
        rotate: -5,
        delay: 0.18
      },
      {
        id: 'obj-f11',
        image: OBJECTS_DATA.find(x => x.id === 'obj-11')?.image || 'https://i.postimg.cc/Y216bCgF/20210714-Axon-morning-FOR.jpg',
        titleEn: 'NICCOLO PHUKET RESORT',
        titleZh: '尼依格罗普吉岛度假村',
        widthClass: 'w-42 sm:w-50',
        heightClass: 'h-28 sm:h-34',
        left: '74%',
        top: '14%',
        rotate: 8,
        delay: 0.24
      },
      {
        id: 'obj-f12',
        image: OBJECTS_DATA.find(x => x.id === 'obj-12')?.image || 'https://i.postimg.cc/NGSnr4TL/6-3.jpg',
        titleEn: 'EAGLE+WEST TOWER',
        titleZh: '西鹰大厦',
        widthClass: 'w-42 sm:w-50',
        heightClass: 'h-28 sm:h-34',
        left: '12%',
        top: '44%',
        rotate: -6,
        delay: 0.30
      },
      {
        id: 'obj-f13',
        image: OBJECTS_DATA.find(x => x.id === 'obj-13')?.image || 'https://i.postimg.cc/bNc6w50Q/zootopia-da.jpg',
        titleEn: 'ZOOTOPIA',
        titleZh: '动物世界',
        widthClass: 'w-42 sm:w-50',
        heightClass: 'h-28 sm:h-34',
        left: '38%',
        top: '48%',
        rotate: 5,
        delay: 0.36
      },
      {
        id: 'obj-f14',
        image: OBJECTS_DATA.find(x => x.id === 'obj-14')?.image || 'https://i.postimg.cc/6pMv27Zc/8-2.jpg',
        titleEn: 'MUSEUM ISLAND',
        titleZh: '博物馆岛',
        widthClass: 'w-42 sm:w-50',
        heightClass: 'h-28 sm:h-34',
        left: '64%',
        top: '42%',
        rotate: -7,
        delay: 0.42
      },
      {
        id: 'obj-f15',
        image: OBJECTS_DATA.find(x => x.id === 'obj-15')?.image || 'https://i.postimg.cc/Cx2tjpRg/9-1.jpg',
        titleEn: 'JOINTS',
        titleZh: '连接之处',
        widthClass: 'w-42 sm:w-50',
        heightClass: 'h-28 sm:h-34',
        left: '82%',
        top: '46%',
        rotate: 4,
        delay: 0.48
      },
      {
        id: 'obj-f16',
        image: OBJECTS_DATA.find(x => x.id === 'obj-16')?.image || 'https://i.postimg.cc/DzdyJHHC/10-1.jpg',
        titleEn: 'HUB',
        titleZh: '城市枢纽',
        widthClass: 'w-42 sm:w-50',
        heightClass: 'h-28 sm:h-34',
        left: '50%',
        top: '74%',
        rotate: -6,
        delay: 0.54
      },
      {
        id: 'obj-f17',
        image: OBJECTS_DATA.find(x => x.id === 'obj-17')?.image || 'https://i.postimg.cc/MGN2GDp8/14-4.jpg',
        titleEn: 'DIVERSE CITY',
        titleZh: '多元城市',
        widthClass: 'w-42 sm:w-50',
        heightClass: 'h-28 sm:h-34',
        left: '24%',
        top: '72%',
        rotate: 7,
        delay: 0.60
      }
    ],
    images: [
      {
        id: 'img-f5',
        image: IMAGES_DATA[0].image,
        titleEn: 'Painting: Witness in the Dim Light',
        titleZh: '绘画：微光中的见证',
        widthClass: 'w-32 sm:w-40',
        heightClass: 'h-44 sm:h-56',
        left: '78%',
        top: '22%',
        rotate: -9,
        delay: 0.2
      },
      {
        id: 'img-f6',
        image: IMAGES_DATA[1].image,
        titleEn: 'Painting: Silent Glow in a Snowy Night',
        titleZh: '绘画：雪夜里的静光',
        widthClass: 'w-36 sm:w-44',
        heightClass: 'h-36 sm:h-44',
        left: '14%',
        top: '48%',
        rotate: 5,
        delay: 0.3
      },
      {
        id: 'img-f7',
        image: IMAGES_DATA[2].image,
        titleEn: 'Painting: Summer Pond Lotus Shadows',
        titleZh: '绘画：夏池莲影',
        widthClass: 'w-36 sm:w-44',
        heightClass: 'h-36 sm:h-44',
        left: '48%',
        top: '44%',
        rotate: -15,
        delay: 0.12
      },
      {
        id: 'img-f8',
        image: IMAGES_DATA[3].image,
        titleEn: 'Painting: Polyphony Under the Dome',
        titleZh: '绘画：穹顶下的复调',
        widthClass: 'w-32 sm:w-40',
        heightClass: 'h-44 sm:h-56',
        left: '32%',
        top: '15%',
        rotate: 6,
        delay: 0.15
      }
    ],
    fragments: [
      {
        id: 'frag-f1',
        image: 'https://i.postimg.cc/TPSVHVWr/20250504-portfolio.jpg',
        titleEn: 'BURROW TOWER',
        titleZh: '地穴之塔',
        widthClass: 'w-42 sm:w-50',
        heightClass: 'h-28 sm:h-34',
        left: '12%',
        top: '22%',
        rotate: -8,
        delay: 0.05
      },
      {
        id: 'frag-f2',
        image: 'https://i.postimg.cc/mr5rYV1p/20170929-IMG-1709.jpg',
        titleEn: 'BAMBOO PAVILION',
        titleZh: '竹亭',
        widthClass: 'w-32 sm:w-40',
        heightClass: 'h-40 sm:h-50',
        left: '58%',
        top: '18%',
        rotate: 8,
        delay: 0.15
      },
      {
        id: 'frag-f3',
        image: 'https://i.postimg.cc/XqF3PHfS/wei-xin-tu-pian-20260604161226-8555-46.jpg',
        titleEn: 'STILL LIFE',
        titleZh: '静物',
        widthClass: 'w-36 sm:w-44',
        heightClass: 'h-36 sm:h-44',
        left: '35%',
        top: '35%',
        rotate: -3,
        delay: 0.25
      }
    ],
    notes: [
      {
        id: 'note-f1',
        image: 'https://i.postimg.cc/63Cz8Cwr/1.png',
        titleEn: 'CAMELLIA PHONE CASE',
        titleZh: '山茶花手机壳',
        widthClass: 'w-42 sm:w-56',
        heightClass: 'h-32 sm:h-42',
        left: '26%',
        top: '22%',
        rotate: -5,
        delay: 0.05
      },
      {
        id: 'note-f2',
        image: 'https://i.postimg.cc/qq4VngVW/Screen-Shot-2026-06-11-150018-875.jpg',
        titleEn: 'THE ROTATING ARCHIVE',
        titleZh: '旋转书夹',
        widthClass: 'w-44 sm:w-56',
        heightClass: 'h-30 sm:h-38',
        left: '52%',
        top: '28%',
        rotate: 4,
        delay: 0.12
      }
    ],
    experiments: [
      {
        id: 'exp-f1',
        image: 'https://i.postimg.cc/SK56t6zd/sound-map.jpg',
        titleEn: 'SOUND MAP',
        titleZh: '声音图谱',
        widthClass: 'w-48 sm:w-56',
        heightClass: 'h-32 sm:h-38',
        left: '38%',
        top: '28%',
        rotate: -2,
        delay: 0.05
      }
    ]
  };

  // Retrieve matching layout items for the active category
  const activeItems = activeCategoryId ? (CATEGORY_ITEMS[activeCategoryId] || []) : [];
  const activeProjectItem = selectedProjectItemId ? activeItems.find(i => i.id === selectedProjectItemId) : null;

  // Contents for the scattered brochures on top of the cabinet
  const bookletsData: Record<string, {
    titleZh: string;
    titleEn: string;
    subZh: string;
    subEn: string;
    contentZh: string[];
    contentEn: string[];
    colorClass: string;
  }> = {
    'curator-foreword': {
      titleZh: '策展人前言 ｜ Foreword',
      titleEn: 'Curator Foreword ｜ Room 03',
      subZh: '“拉开抽屉的触觉深度”',
      subEn: '"The Tactile Gravity of Pulling"',
      colorClass: 'border-t-4 border-stone-800',
      contentZh: [
        '欢迎来到Penny的画廊，这里陈列的是艺术家Penny的设计实体和影像存档。',
        '在今天的屏幕纪元，所有的信息都被拉平在两毫米的无感平滑电容玻璃镜面背后。我们对深浅、重量、多孔性以及金属阻尼的认知，在不断地被千篇一律的触摸动作所钝化。',
        '本次展览的交互装置，即以此抽屉柜为隐喻：原木外壳下隐藏着极其艳丽的彩色呢绒衬垫，呼应打开一瞬不期而遇的灵感。你可以通过点击或拖动抽屉，来重拾有关阻力、厚重感与探求未知的空间动作。'
      ],
      contentEn: [
        "Welcome to Penny's Gallery, showcasing design artifacts and visual archives of the artist Penny.",
        'In today’s smartphone era, physical coordinates are flattened behind a two-millimeter capillary screen of unresponsive glass. Our cognitive sensors for depth, physical mass, porosity, and metal dampers are gradually numbed by uniform swipes.',
        'This exhibition table uses a physical chest of drawers as a spatial metaphor: timber hulls conceal highly-saturated protective velvet lininings, mirroring sudden flares of aesthetic inspirations. Swiping and easing these drawers returns us to drag-friction and weight.'
      ]
    },
    'exhibition-booklet': {
      titleZh: '展览馆藏折页 ｜ Catalogue',
      titleEn: 'Exhibition Catalogue',
      subZh: '【馆藏分区与五大设计抽底】',
      subEn: '[5 Curated Compartments]',
      colorClass: 'border-t-4 border-[#9c3f3a]',
      contentZh: [
        '抽屉 01【物 ｜ Objects】：聚焦于成熟的地标公共设计与城市空间活化案例（如《前滩 31 文演中心》、《华纺小区改造》等），展现了不同尺度空间下结构几何、自然光影与材料厚度的宏观碰撞。',
        '抽屉 02【图像 ｜ Images】：收录了《微光中的见证》、《雪夜里的静光》、《夏池莲影》和《穹顶下的复调》等深具东方意境的光影板绘与绘画原作，以纯粹的视觉厚度和颜色复调探寻深处的宁静。',
        '抽屉 03【碎片 ｜ Fragments】：展示了精密的微缩概念架构作品（包含精巧构图的《静物》、探索传统有机弯曲工艺的《竹亭》与探讨神圣围合感的《地穴之塔》模型插片），记录了材料演变和空间原型的设计碎片。',
        '抽屉 04【试验 ｜ Experiments】：收录了可交互的《声音图谱 (SOUND MAP)》技术实验工坊，通过身体的舞蹈实时重构为有机的生成美术，建立了听觉与触知觉的联觉通道，该作品是GSD致敬包豪斯诞生一百周年的演出之一。',
        '抽屉 05【拟 ｜ Mimicry】：收录了艺术家通过AIGC and Vibe Coding等实现的不同作品（包含品牌广告、网页设计、小程序设计等）。'
      ],
      contentEn: [
        'Drawer 01 [Objects]: Focuses on landmark public designs and urban activation cases (such as Qiantan 31 Cultural Center and Huafang Dormitory Renovation), displaying macro collisions of structure, natural light, and material density.',
        'Drawer 02 [Images]: Compiles atmospheric digital paintings and original drawings (such as Witness in the Shimmer, Silent Light in the Snowy Night, Lotus Shadows, and Polyphony under the Dome), exploring deep serenity with pure visual depth and color polyphony.',
        'Drawer 03 [Fragments]: Showcases precise miniature conceptual architecture pieces (including the meticulously composed Still Life, the Bamboo Pavilion exploring traditional organic bending crafts, and the Crypt Tower model exploring sacred enclosure), archiving architectural prototype and material evolution fragments.',
        'Drawer 04 [Experiments]: Features the interactive "SOUND MAP" tech lab, mapping bodily dances into real-time organic generative art to establish synesthetic audio-tactile channels. This piece was performed at GSD in tribute to the 100th anniversary of Bauhaus.',
        'Drawer 05 [Mimicry]: Houses diverse speculative creations implemented by the artist using AIGC and Vibe Coding (including branding advertisements, web development, mini-program interfaces, etc.).'
      ]
    },
    'about-artist': {
      titleZh: '关于艺术家 ｜ Biography & CV',
      titleEn: 'About the Artist ｜ Biography & CV',
      subZh: '“在坚实构造中寻找数字与流体意境的创作者”',
      subEn: '"A Creator Finding Digital & Fluid Narratives In Solitary Tectonics"',
      colorClass: 'border-t-4 border-[#10b981]',
      contentZh: [
        '毕静怡，1993年出生，建筑学者、设计师及艺术创作者，哈佛大学设计学院（GSD）建筑学硕士。目前担任厦门大学嘉庚学院建筑学专任教师、大一设计课教研组组长。',
        '她的作品跨越实体公共空间营造（曾任如恩设计 Neri&Hu 设计师，主导前滩31等多个地标设计）到 AIGC 先锋数字影像、可交互联觉声音技术系统，致力于寻找在水泥、陶瓷等重物质结构与流体动态感官界面之间的“物理体温”共振与空间转译。'
      ],
      contentEn: [
        'Jingyi Bi (born 1993) is an architectural scholar, designer, and digital artist, holding a Master of Architecture (M.Arch II) from the Harvard Graduate School of Design (GSD). She currently serves as an Architectural Lecturer and Head of the First-Grade Design Curriculum Group at Xiamen University Tan Kah Kee College.',
        'Her diverse projects span from monumental civic physical spaces (formerly designer at Neri&Hu lead-coordinating structures like Qiantan 31 Performing Arts Center) to speculative AI tactile films and interactive spatial hardware systems. She and her research explore the synaptic friction and warm physical translations between heavy mineral aggregates and ephemeral computer surfaces.'
      ]
    }
  };

  const spotlightTargets: Record<CategoryId, {
    lightType: 'left' | 'right';
    originX: number;
    originY: number;
    targetX: number;
    targetY: number;
    coneWidth: number;
  }> = {
    objects: {
      lightType: 'left',
      originX: 395,
      originY: 80,
      targetX: 440,
      targetY: 770,
      coneWidth: 160
    },
    images: {
      lightType: 'left',
      originX: 395,
      originY: 80,
      targetX: 620,
      targetY: 770,
      coneWidth: 160
    },
    fragments: {
      lightType: 'left',
      originX: 395,
      originY: 80,
      targetX: 800,
      targetY: 770,
      coneWidth: 160
    },
    experiments: {
      lightType: 'right',
      originX: 1275,
      originY: 80,
      targetX: 980,
      targetY: 770,
      coneWidth: 160
    },
    notes: {
      lightType: 'right',
      originX: 1275,
      originY: 80,
      targetX: 1160,
      targetY: 770,
      coneWidth: 160
    }
  };

  const activeTarget = (pulledDrawerId && !activeCategoryId) ? spotlightTargets[pulledDrawerId] : null;

  const selectedBooklet = activeBookletId ? bookletsData[activeBookletId] : null;

  return (
    <div className={`relative min-h-screen text-[#1A1A1A] overflow-hidden flex flex-col justify-end items-center font-sans pb-0 transition-colors duration-1000 ease-in-out ${
      activeTarget ? 'bg-[#D4D0C1]' : 'bg-[#FBFBFA]'
    }`}>
      
      {/* ----------------- SEPARATE DYNAMIC SPOTLIGHT BEAMS LAYER ----------------- */}
      <div className="absolute inset-0 z-[1] overflow-hidden select-none pointer-events-none hidden md:block">
        <svg 
          className="absolute inset-0 w-full h-full object-cover" 
          viewBox="0 0 1600 900" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="spotlight-cone-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFEEB" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#FFFAD3" stopOpacity="0.58" />
              <stop offset="70%" stopColor="#FFFAE6" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#FFFAE6" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="spotlight-floor-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFEE3" stopOpacity="0.8" />
              <stop offset="55%" stopColor="#FFFAD3" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#FFFAE6" stopOpacity="0" />
            </radialGradient>
          </defs>

          <AnimatePresence mode="wait">
            {activeTarget && (
              <motion.g
                key={pulledDrawerId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                {/* Spotlight Beam Cone */}
                <polygon
                  points={`${activeTarget.originX},${activeTarget.originY} ${activeTarget.targetX - activeTarget.coneWidth / 2},${activeTarget.targetY} ${activeTarget.targetX + activeTarget.coneWidth / 2},${activeTarget.targetY}`}
                  fill="url(#spotlight-cone-grad)"
                />
                
                {/* Ground/Drawer light pool glow */}
                <ellipse
                  cx={activeTarget.targetX}
                  cy={activeTarget.targetY}
                  rx={95}
                  ry={28}
                  fill="url(#spotlight-floor-grad)"
                />

                {/* Glowing bulb origin bulb glow */}
                <circle
                  cx={activeTarget.originX}
                  cy={activeTarget.originY}
                  r={10}
                  fill="#FFFEEB"
                  opacity={0.85}
                  style={{ filter: 'blur(2px)' }}
                />
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </div>

      {/* ----------------- DYNAMIC HAND-DRAWN OUTLINE GALLERY BACKGROUND ----------------- */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none hidden md:block opacity-[0.25]">
        <svg 
          className="absolute inset-0 w-full h-full object-cover" 
          viewBox="0 0 1600 900" 
          fill="none" 
          stroke="black" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ceiling tracks & spotlight mounts */}
          <line x1="100" y1="50" x2="650" y2="50" />
          <line x1="950" y1="50" x2="1500" y2="50" />
          
          <line x1="220" y1="0" x2="220" y2="50" />
          <line x1="500" y1="0" x2="500" y2="50" />
          <line x1="1100" y1="0" x2="1100" y2="50" />
          <line x1="1380" y1="0" x2="1380" y2="50" />

          {/* Spotlight brackets & heads */}
          {/* Spot 1 */}
          <path d="M 180 50 Q 180 65 195 65" />
          <rect x="180" y="65" width="30" height="20" rx="3" fill="white" stroke="black" strokeWidth="3" transform="rotate(15 195 75)" />
          
          {/* Spot 2 */}
          <path d="M 380 50 Q 380 65 395 65" />
          <rect x="385" y="65" width="20" height="30" rx="3" fill="white" stroke="black" strokeWidth="3" transform="rotate(-10 395 80)" />
          
          {/* Spot 3 */}
          <path d="M 580 50 Q 580 65 595 65" />
          <rect x="580" y="65" width="30" height="20" rx="3" fill="white" stroke="black" strokeWidth="3" transform="rotate(30 595 75)" />

          {/* Spot 4 */}
          <path d="M 1020 50 Q 1020 65 1035 65" />
          <rect x="1015" y="65" width="30" height="20" rx="3" fill="white" stroke="black" strokeWidth="3" transform="rotate(-25 1030 75)" />

          {/* Spot 5 */}
          <path d="M 1260 50 Q 1260 65 1275 65" />
          <rect x="1265" y="65" width="20" height="30" rx="3" fill="white" stroke="black" strokeWidth="3" transform="rotate(15 1275 80)" />

          {/* Spot 6 */}
          <path d="M 1440 50 Q 1440 65 1455 65" />
          <rect x="1440" y="65" width="30" height="20" rx="3" fill="white" stroke="black" strokeWidth="3" transform="rotate(-10 1455 75)" />


          {/* ----------------- EXHIBITION PICTURES (PURE WIREFRAME ARTWORKS) ----------------- */}
          
          {/* Central Artwork peeking from behind the main cabinet card */}
          <g>
            {/* Hanging coordinate wires */}
            <line x1="800" y1="0" x2="730" y2="100" />
            <line x1="800" y1="0" x2="870" y2="100" />
            {/* Frame */}
            <rect x="630" y="100" width="340" height="150" rx="8" fill="white" stroke="black" strokeWidth="4" />
            <rect x="645" y="115" width="310" height="120" rx="2" fill="none" stroke="black" strokeWidth="2.5" />
            
            {/* Isometric abstract architecture drawings inside frame */}
            <path d="M 680 210 L 680 145 C 680 125 720 125 720 145 L 720 210" fill="none" stroke="black" strokeWidth="2.5" />
            <circle cx="700" cy="180" r="12" fill="none" stroke="black" strokeWidth="2" />
            
            <path d="M 750 210 L 810 210 L 810 185 L 790 185 L 790 160 L 770 160 L 770 135 L 750 135 Z" fill="none" stroke="black" strokeWidth="2.5" />
            <line x1="840" y1="130" x2="920" y2="210" />
            <line x1="920" y1="130" x2="840" y2="210" />
            <circle cx="880" cy="170" r="22" fill="none" stroke="black" strokeWidth="2.5" />
          </g>

          {/* Left Wing Artworks */}
          <g>
            {/* Artwork 1: Portrait Face Sketch (Matisse Style Outline) */}
            <rect x="80" y="140" width="180" height="240" rx="12" fill="white" stroke="black" strokeWidth="4" />
            <rect x="92" y="152" width="156" height="216" rx="4" fill="none" stroke="black" strokeWidth="2.5" />
            {/* Abstract hair and face line */}
            <path d="M 170 180 C 145 190 130 220 135 250 C 140 280 180 300 170 330 C 165 345 150 350 180 350" fill="none" stroke="black" strokeWidth="3" />
            <path d="M 170 240 Q 210 220 190 280 Q 210 320 170 320" fill="none" stroke="black" strokeWidth="3" />
            <circle cx="155" cy="245" r="4" fill="black" stroke="none" />
            <circle cx="185" cy="245" r="4" fill="black" stroke="none" />
            <path d="M 162 275 Q 170 285 178 275" fill="none" stroke="black" strokeWidth="2.5" />

            {/* Artwork 2: Small Square Outline Plant */}
            <rect x="280" y="180" width="100" height="100" rx="6" fill="white" stroke="black" strokeWidth="4" />
            <path d="M 330 260 C 330 220 310 210 320 195 Q 330 190 340 215 C 345 230 330 240 330 260" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 330 245 C 335 235 365 230 350 220 Q 340 220 330 235" fill="none" stroke="black" strokeWidth="2.5" />

            {/* Artwork 3: Landscape Sunset & Ridges */}
            <rect x="80" y="440" width="220" height="150" rx="8" fill="white" stroke="black" strokeWidth="4" />
            <rect x="92" y="452" width="196" height="126" rx="3" fill="none" stroke="black" strokeWidth="2.5" />
            {/* Ground / waves */}
            <path d="M 92 540 Q 130 510 170 535 T 250 510 T 288 535 M 92 560 L 288 560" fill="none" stroke="black" strokeWidth="2.5" />
            {/* Bold Sun rays outline */}
            <circle cx="190" cy="495" r="22" fill="none" stroke="black" strokeWidth="3" />
          </g>

          {/* Right Wing Artworks */}
          <g>
            {/* Artwork 4: Famous Marvis Toothpaste tube silhouette */}
            <rect x="1310" y="130" width="210" height="280" rx="14" fill="white" stroke="black" strokeWidth="4" />
            <rect x="1322" y="142" width="186" height="256" rx="5" fill="none" stroke="black" strokeWidth="2.5" />
            
            {/* Decorative Central Shield / Emblem outline */}
            <circle cx="1415" cy="250" r="40" fill="none" stroke="black" strokeWidth="3" />
            <circle cx="1415" cy="250" r="32" fill="none" stroke="black" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 1400 235 L 1430 235 L 1415 270 Z" fill="none" stroke="black" strokeWidth="3" />
            <line x1="1350" y1="210" x2="1480" y2="330" strokeWidth="2" />
            
            {/* Vertical Crest lines representing classic engraving */}
            <path d="M 1410 160 L 1410 210 M 1420 160 L 1420 210" strokeWidth="2" />
            <path d="M 1410 290 L 1410 370 M 1420 290 L 1420 370" strokeWidth="2" />

            {/* Artwork 5: Bold Typography Sign Board - MARVIS style vector block letters */}
            <rect x="1270" y="460" width="250" height="130" rx="6" fill="white" stroke="black" strokeWidth="4" />
            <rect x="1282" y="472" width="226" height="106" rx="2" fill="none" stroke="black" strokeWidth="2.5" />
            
            {/* Outlined Lettering 'TACTILE' */}
            <text x="1300" y="534" fontFamily="sans-serif" fontSize="30" fontWeight="900" letterSpacing="6" fill="none" stroke="black" strokeWidth="3">TACTILE</text>
            <line x1="1295" y1="550" x2="1495" y2="550" strokeWidth="2" />
          </g>


          {/* ----------------- MUSEUM BARRICADE (ROPES & STANCHIONS) ----------------- */}
          <g>
            {/* Outer Left Post */}
            <path d="M 50 820 C 50 812 110 812 110 820 Z" fill="white" stroke="black" strokeWidth="3" />
            <line x1="80" y1="816" x2="80" y2="670" strokeWidth="3" />
            <circle cx="80" cy="660" r="10" fill="white" stroke="black" strokeWidth="3" />

            {/* Left Post adjacent to cabinet */}
            <path d="M 310 830 C 310 822 370 822 370 830 Z" fill="white" stroke="black" strokeWidth="3" />
            <line x1="340" y1="826" x2="340" y2="680" strokeWidth="3" />
            <circle cx="340" cy="670" r="10" fill="white" stroke="black" strokeWidth="3" />

            {/* Right Post adjacent to cabinet */}
            <path d="M 1230 830 C 1230 822 1290 822 1290 830 Z" fill="white" stroke="black" strokeWidth="3" />
            <line x1="1260" y1="826" x2="1260" y2="680" strokeWidth="3" />
            <circle cx="1260" cy="670" r="10" fill="white" stroke="black" strokeWidth="3" />

            {/* Outer Right Post */}
            <path d="M 1490 820 C 1490 812 1550 812 1550 820 Z" fill="white" stroke="black" strokeWidth="3" />
            <line x1="1520" y1="816" x2="1520" y2="670" strokeWidth="3" />
            <circle cx="1520" cy="660" r="10" fill="white" stroke="black" strokeWidth="3" />

            {/* Drooping velvet rope paths with beautiful bezier curves */}
            <path d="M 80 660 Q 210 705 340 670" fill="none" stroke="black" strokeWidth="3.5" />
            <path d="M 1260 670 Q 1390 705 1520 660" fill="none" stroke="black" strokeWidth="3.5" />
            {/* Subtle connecting warning/safety rope behind table */}
            <path d="M 340 670 Q 800 710 1260 670" fill="none" stroke="black" strokeWidth="1.5" strokeDasharray="5 5" />
          </g>


          {/* ----------------- PARALLEL OBSERVER BENCH ----------------- */}
          <g>
            {/* Supporting wood leg bars */}
            <line x1="680" y1="850" x2="680" y2="780" strokeWidth="3" />
            <line x1="920" y1="850" x2="920" y2="780" strokeWidth="3" />
            {/* Base block */}
            <line x1="640" y1="850" x2="960" y2="850" strokeWidth="4" />
            {/* Top outline cushion block */}
            <rect x="650" y="750" width="300" height="30" rx="4" fill="white" stroke="black" strokeWidth="3" />
            {/* Buttoned details lines */}
            <line x1="725" y1="750" x2="725" y2="780" strokeWidth="2.5" />
            <line x1="800" y1="750" x2="800" y2="780" strokeWidth="2.5" />
            <line x1="875" y1="750" x2="875" y2="780" strokeWidth="2.5" />
          </g>
        </svg>
      </div>

      {/* ----------------- SEAMLESSLY INTEGRATED FLOATING VINYL SHOWCASE DETAIL STATE ----------------- */}
      <AnimatePresence>
        {activeCategoryId ? (
          <div 
            id="floating-album-showcase-container"
            ref={constraintsRef}
            className="absolute inset-0 z-30 flex items-center justify-center overflow-hidden"
          >
            {/* Absolute clickable background overlay allowing easy dismiss back to the master page context */}
            <div 
              id="showcase-backdrop-dismiss-hotzone"
              onClick={() => {
                if (!areThumbnailsStacked) {
                  setAreThumbnailsStacked(true);
                } else {
                  onCloseDrawer?.();
                }
              }}
              className="absolute inset-0 z-0 bg-[#000000]/[0.01] cursor-crosshair"
              title={isEn ? (areThumbnailsStacked ? "Click stacked photos to scatter" : "Click empty area to gather") : (areThumbnailsStacked ? "点击叠架的照片即可散开" : "点击空白区域退回聚拢")}
            />
 
            {/* Scattered non-grid layered floating gallery thumbnails */}
            <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
              {activeItems.map((item, index) => {
                const customZ = cardZIndices[item.id] || (10 + index);
                const isHovered = hoveredRecordIndex === index;
                const isAnyHovered = hoveredRecordIndex !== null;

                // Dynamically arrange items to form a perfect, elegant ring/ellipse around the screen coordinates
                const ringLayout = (() => {
                  const total = activeItems.length;
                  if (total <= 1) {
                    return { left: "50%", top: "42%" };
                  }
                  // Evenly distribute angles around 360 degrees, starting from the top (-90 deg / -PI/2)
                  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
                  const rx = 38; // Horizontal radius of the ellipse (38% screen width)
                  const ry = 28; // Vertical radius of the ellipse (28% screen height)
                  const cx = 50; // Ellipse center X coordinate (centered in the viewport)
                  const cy = 42; // Ellipse center Y coordinate (centered slightly above cabinet)
                  return {
                    left: `${cx + rx * Math.cos(angle)}%`,
                    top: `${cy + ry * Math.sin(angle)}%`
                  };
                })();

                return (
                  <motion.div
                    id={`floating-thumb-${item.id}`}
                    key={item.id}
                    drag={!areThumbnailsStacked}
                    dragConstraints={constraintsRef}
                    dragElastic={0.25}
                    dragMomentum={true}
                    onDragStart={() => bringToFront(item.id)}
                    onTap={() => {
                      bringToFront(item.id);
                      if (areThumbnailsStacked) {
                        setAreThumbnailsStacked(false);
                      } else {
                        setSelectedProjectItemId(item.id);
                      }
                    }}
                    onMouseEnter={() => setHoveredRecordIndex(index)}
                    onMouseLeave={() => setHoveredRecordIndex(null)}
                    className="absolute cursor-pointer select-none pointer-events-auto"
                    style={{
                      left: areThumbnailsStacked ? "50%" : ringLayout.left,
                      top: areThumbnailsStacked ? "45%" : ringLayout.top,
                      zIndex: customZ,
                    }}
                    initial={{
                      opacity: 0,
                      scale: 0.3,
                      x: "-50%",
                      y: "-50%",
                      rotate: item.rotate,
                    }}
                    animate={{
                      opacity: isAnyHovered ? (isHovered ? 1 : 0.2) : 1,
                      scale: isHovered ? (areThumbnailsStacked ? 1.15 : 1.08) : 1,
                      x: areThumbnailsStacked 
                        ? `calc(-50% + ${(index - (activeItems.length - 1) / 2) * 12}px)`
                        : "-50%",
                      y: areThumbnailsStacked 
                        ? `calc(-50% + ${(index - (activeItems.length - 1) / 2) * -5}px)`
                        : "-50%",
                      rotate: areThumbnailsStacked 
                        ? (index - (activeItems.length - 1) / 2) * 4
                        : (isHovered ? item.rotate + 6 : item.rotate),
                    }}
                    transition={{
                      default: { type: "spring", stiffness: 180, damping: 20 },
                      opacity: { duration: 0.35, ease: "easeInOut" },
                      scale: { type: "spring", stiffness: 220, damping: 18 },
                    }}
                  >
                    {/* Inner floating wrapper to partition layout position states and idle floating animations cleanly */}
                    <motion.div
                      animate={{
                        y: [0, (index % 2 === 0 ? -4 : 4), 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3.5 + (index % 3) * 0.7,
                        ease: "easeInOut",
                      }}
                    >
                      {/* Highly tactile, borderless, shadowless picture elements floating organically */}
                      <div className={`relative overflow-hidden pointer-events-auto rounded-lg select-none group/thumb ${item.widthClass} ${item.heightClass}`}>
                        <img
                          src={item.image}
                          alt={isEn ? item.titleEn : item.titleZh}
                          className="w-full h-full object-cover pointer-events-none rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Interactive overlay info label, appears on hover to add meticulous luxury detail */}
                        <div className="absolute inset-x-0 bottom-0 bg-stone-900/80 backdrop-blur-xs p-2.5 transition-opacity duration-350 opacity-0 group-hover/thumb:opacity-100 flex flex-col justify-center items-start text-[10px] text-white font-sans select-none pointer-events-none">
                          <span className="truncate w-full font-black tracking-tight uppercase leading-none mb-1 text-xs text-white">
                            {isEn ? item.titleEn : item.titleZh}
                          </span>
                          <div className="flex justify-between items-center w-full font-mono text-[7px] text-stone-300 font-bold uppercase leading-none tracking-widest mt-0.5">
                            <span className="text-emerald-400 font-black">{isEn ? "✦ READ CASE" : "✦ 点击翻开"}</span>
                            <span>SYS // {item.id.toUpperCase()}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Simplified Stacked Project Detail Overlay with Centered Description */}
            <AnimatePresence>
              {selectedProjectItemId && activeProjectItem && (() => {
                const details = getItemDetails(selectedProjectItemId);
                const categoryLabel = getProjectCategoryLabel(activeCategoryId || 'objects', isEn);
                const imagesList = getProjectImages(selectedProjectItemId, activeProjectItem.image);
                const dbItem = getDatabaseItemById(selectedProjectItemId);
                
                // For previous/next navigation
                const currentIndex = activeItems.findIndex(i => i.id === selectedProjectItemId);

                if (activeCategoryId === 'images' || activeCategoryId === 'fragments' || activeCategoryId === 'experiments' || activeCategoryId === 'notes') {
                  const mainImgUrl = imagesList[currentImageIndex] || activeProjectItem.image;
                  const isVideo = (activeCategoryId === 'experiments' || activeCategoryId === 'notes') && (selectedProjectItemId.startsWith('exp-') || selectedProjectItemId.startsWith('note-'));

                  return (
                    <motion.div
                      id="project-sketchbook-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-40 bg-white flex flex-col justify-between overflow-y-auto select-none p-6 sm:p-12"
                    >
                      {/* TOP CORNERS ACTION CONTROLS */}
                      <div className="flex justify-between items-center w-full max-w-7xl mx-auto z-10 shrink-0 border-b border-neutral-150 pb-4">
                        {/* Top-left: Back to Home Gallery */}
                        <button
                          id="back-to-home-btn"
                          onClick={() => {
                            setSelectedProjectItemId(null);
                            onCloseDrawer?.();
                          }}
                          className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded-full text-xs font-black uppercase tracking-wider hover:bg-black hover:text-white transition-all cursor-pointer bg-white"
                          title={isEn ? "Return to Main Gallery Home" : "返回主展厅"}
                        >
                          <Home className="w-3.5 h-3.5" />
                          <span>{isEn ? "Home" : "回到主页"}</span>
                        </button>

                        {/* Mini-meta details: Item index tracker */}
                        <div className="hidden sm:block text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
                          {currentIndex + 1} / {activeItems.length} — INDEX // {activeProjectItem.id.toUpperCase()}
                        </div>

                        {/* Top-right: Back to Drawer Details Grid */}
                        <button
                          id="back-to-drawer-btn"
                          onClick={() => setSelectedProjectItemId(null)}
                          className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded-full text-xs font-black uppercase tracking-wider hover:bg-black hover:text-white transition-all cursor-pointer bg-white"
                          title={isEn ? "Return to Drawer Category" : "回到本品类柜抽屉"}
                        >
                          <span>{isEn ? "Back to Drawer" : "回到抽屉"}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* WHITE MINIMALIST SINGLE PAGE VIEWPORT FOR IMAGERY */}
                      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-start my-auto py-12 px-4 select-text">
                        {/* IMAGE CELL FRAME (TOP) */}
                        <div className="relative w-full max-w-full flex flex-col items-center border border-neutral-200 bg-white p-2 sm:p-3 overflow-hidden select-none group shadow-[0_4px_24px_rgba(0,0,0,0.04)] rounded-sm">
                          {isVideo ? (
                            <div className="w-full flex flex-col gap-2">
                              <div className="w-full aspect-video rounded-xs overflow-hidden bg-black border-2 border-black">
                                <iframe 
                                  src={`//player.bilibili.com/player.html?bvid=${(() => {
                                    const url = dbItem?.videoUrl;
                                    if (!url) return 'BV1ajEF6TEXE';
                                    const match = url.match(/(BV[a-zA-Z0-9]+)/);
                                    return match ? match[1] : 'BV1ajEF6TEXE';
                                  })()}&p=1&high_quality=1&autoplay=1&t=1`}
                                  scrolling="no" 
                                  border="0" 
                                  frameBorder="no" 
                                  frameSpacing="0" 
                                  allowFullScreen={true}
                                  allow="autoplay; encrypted-media; fullscreen"
                                  sandbox="allow-top-navigation allow-same-origin allow-scripts allow-forms allow-popups"
                                  className="w-full h-full"
                                />
                              </div>
                              <div className="text-[10px] sm:text-xs text-stone-500 font-sans font-medium flex items-start gap-1 px-1 py-1">
                                <span className="text-stone-700 font-bold shrink-0">💡 {isEn ? "Tip:" : "小提示："}</span>
                                <span>
                                  {isEn 
                                    ? "Modern browsers block sound by default for autoplaying videos. Simply click the speaker icon in Bilibili's bottom right control bar once to restore sound. Your browser will remember this setting for subsequent visits!"
                                    : "由于浏览器自带的媒体保护机制，自动播放时会默认静音。只需手动点击播放器右下角喇叭图标恢复声音一次，后续每次进入即可自动带声播放。"}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <img
                              src={mainImgUrl}
                              alt={isEn ? details.titleEn : details.titleZh}
                              onClick={() => setZoomedImageUrl(mainImgUrl)}
                              className="max-w-full max-h-[55vh] sm:max-h-[60vh] object-contain cursor-zoom-in filter brightness-100 transition-all duration-300 rounded-xs"
                              referrerPolicy="no-referrer"
                            />
                          )}
                        </div>

                        {/* TEXT DETAILS CELL (UNDERNEATH) */}
                        {(() => {
                          const imgMeta = getImageSpecificMetadata(selectedProjectItemId, details.date, details.dimensions, isEn);
                          return (
                            <div className="w-full text-left font-sans text-xs leading-[1.6] mt-8 select-text space-y-0.5 tracking-wide max-w-lg">
                              {/* Title text - Bold Sans with tight tracking */}
                              <div className="font-sans text-sm sm:text-base font-bold text-neutral-900 tracking-wider uppercase mb-2">
                                {isEn ? (details.titleEn || activeProjectItem.titleEn).toUpperCase() : (details.titleZh || activeProjectItem.titleZh)}
                              </div>

                              {/* TYPE field */}
                              <div className="text-neutral-800">
                                <span className="font-sans font-semibold text-neutral-500 mr-2">{isEn ? "TYPE:" : "类型:"}</span>
                                <span className="font-sans font-normal">{imgMeta.type}</span>
                              </div>

                              {/* DATE field */}
                              <div className="text-neutral-800">
                                <span className="font-sans font-semibold text-neutral-500 mr-2">{isEn ? "DATE:" : "时间:"}</span>
                                <span className="font-sans font-normal">{imgMeta.date}</span>
                              </div>

                              {/* LOCATION field */}
                              <div className="text-neutral-800">
                                <span className="font-sans font-semibold text-neutral-500 mr-2">{isEn ? "LOCATION:" : "地点:"}</span>
                                <span className="font-sans font-normal">{imgMeta.location}</span>
                              </div>

                              {/* INSTRUCTOR field */}
                              {imgMeta.instructor && 
                               !imgMeta.instructor.includes("独立") && 
                               !imgMeta.instructor.toLowerCase().includes("independent") && (
                                <div className="text-neutral-800">
                                  <span className="font-sans font-semibold text-neutral-500 mr-2">{isEn ? "INSTRUCTOR:" : "指导者:"}</span>
                                  <span className="font-sans font-normal">{imgMeta.instructor}</span>
                                </div>
                              )}

                              {/* MEDIUM field */}
                              <div className="text-neutral-800">
                                <span className="font-sans font-semibold text-neutral-500 mr-2">
                                  {selectedProjectItemId.startsWith('frag-') || selectedProjectItemId.startsWith('exp-')
                                    ? (isEn ? "COOPERATOR:" : "合作者:")
                                    : (isEn ? "MEDIUM:" : "媒介:")}
                                </span>
                                <span className="font-sans font-normal">{imgMeta.medium}</span>
                              </div>

                              {/* Poetic description below metadata */}
                              {(details.descZh || details.descEn) && (
                                <div className="pt-4 font-sans text-xs sm:text-sm text-neutral-600 tracking-normal normal-case leading-relaxed select-text font-light border-t border-neutral-150 mt-5 space-y-1.5">
                                  {details.descZh && (
                                    <p className="font-medium text-neutral-800 mb-1 leading-relaxed">{details.descZh}</p>
                                  )}
                                  {details.descEn && details.descEn !== details.descZh && (
                                    <p className="text-neutral-400 font-light text-[11px] sm:text-xs leading-relaxed">{details.descEn}</p>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </div>

                      {/* STACKED IMAGE GALLERIES PILE FOR ROTATING ARCHIVE IN NOTES DRAWER */}
                      {selectedProjectItemId === 'note-f2' && imagesList && imagesList.length > 0 && (
                        <div className="relative w-full max-w-6xl h-80 sm:h-[450px] flex items-end justify-center pb-20 sm:pb-32 mx-auto overflow-visible select-none shrink-0 mt-6 sm:mt-16">
                          {/* Visual stacking guide in text */}
                          <div className="absolute top-0 flex items-center gap-2 select-none pointer-events-none text-neutral-350 font-mono text-[9px] uppercase tracking-widest z-10">
                            <span>✦</span>
                            <span>{isEn ? "Interactive Web Interface Gallery // Click to expand" : "网页交互界面演示图库 // 点击下方相纸放大阅读细节"}</span>
                            <span>✦</span>
                          </div>

                          {/* Pile deck cards loop */}
                          {imagesList.map((imgUrl, iIdx) => {
                            const count = imagesList.length;
                            const ratio = count > 1 ? (iIdx / (count - 1)) - 0.5 : 0;
                            
                            // Organic noise variables to break mathematical symmetry
                            const noiseRot = [-7, 5, -3, 8, -5][iIdx % 5];
                            const noiseX = [-1.5, 2.5, -0.5, 3.5, -2][iIdx % 5]; 
                            const noiseY = [14, -18, 5, 22, -7][iIdx % 5]; 
                            
                            const rotation = ratio * 48 + noiseRot;
                            const translateX = `${ratio * 18 + noiseX}vw`;
                            
                            const baseHeightArch = ratio * ratio * 75;
                            const translateY = baseHeightArch + noiseY;
                            
                            const hoverTranslateX = `${ratio * 15 + noiseX * 0.8}vw`;

                            const floatDuration = 4.5 + (iIdx * 0.8);
                            const wobbleDuration = 5.5 + (iIdx * 1.1);
                            const floatOffset = 16 + (iIdx * 2.5);
                            const wobbleOffset = 4 + (iIdx * 1.1);
                            
                            return (
                              <motion.div
                                key={iIdx}
                                initial={{ rotate: rotation, x: translateX, y: translateY, scale: 0.95 }}
                                animate={{ 
                                  x: translateX,
                                  y: [translateY - floatOffset, translateY + floatOffset],
                                  rotate: [rotation - wobbleOffset, rotation + wobbleOffset]
                                }}
                                transition={{
                                  y: {
                                    duration: floatDuration,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                    delay: iIdx * 0.35
                                  },
                                  rotate: {
                                    duration: wobbleDuration,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                    delay: iIdx * 0.55
                                  },
                                  x: { type: "spring", stiffness: 95, damping: 21 },
                                  scale: { duration: 0.25 }
                                }}
                                whileHover={{ 
                                  rotate: rotation * 0.25, 
                                  x: hoverTranslateX, 
                                  y: translateY - 55, 
                                  scale: 1.08, 
                                  zIndex: 45,
                                  transition: { 
                                    type: "spring",
                                    stiffness: 170,
                                    damping: 17,
                                    y: { duration: 0.25 },
                                    rotate: { duration: 0.25 }
                                  }
                                }}
                                onClick={() => setZoomedImageUrl(imgUrl)}
                                className="absolute w-[240px] sm:w-[320px] md:w-[380px] lg:w-[420px] aspect-4/3 overflow-hidden rounded-xs shadow-[8px_8px_20px_rgba(0,0,0,0.14)] hover:shadow-[16px_16px_32px_rgba(0,0,0,0.24)] transition-all cursor-zoom-in filter ease-out"
                                style={{ zIndex: 10 + iIdx }}
                              >
                                <img 
                                  src={imgUrl} 
                                  alt="" 
                                  className="w-full h-full object-cover filter saturate-[0.85] contrast-[1.02] select-none"
                                  referrerPolicy="no-referrer"
                                />
                              </motion.div>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    id="project-sketchbook-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-40 bg-white flex flex-col justify-between overflow-y-auto select-none p-6 sm:p-12"
                  >
                    {/* TOP CORNERS ACTION CONTROLS */}
                    <div className="flex justify-between items-center w-full max-w-7xl mx-auto z-10 shrink-0 border-b border-neutral-150 pb-4">
                      {/* Top-left: Back to Home Gallery */}
                      <button
                        id="back-to-home-btn"
                        onClick={() => {
                          setSelectedProjectItemId(null);
                          onCloseDrawer?.();
                        }}
                        className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded-full text-xs font-black uppercase tracking-wider hover:bg-black hover:text-white transition-all cursor-pointer bg-white"
                        title={isEn ? "Return to Main Gallery Home" : "返回主展厅"}
                      >
                        <Home className="w-3.5 h-3.5" />
                        <span>{isEn ? "Home" : "回到主页"}</span>
                      </button>

                      {/* Mini-meta details: Item index tracker */}
                      <div className="hidden sm:block text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
                        {currentIndex + 1} / {activeItems.length} — INDEX // {activeProjectItem.id.toUpperCase()}
                      </div>

                      {/* Top-right: Back to Drawer Details Grid */}
                      <button
                        id="back-to-drawer-btn"
                        onClick={() => setSelectedProjectItemId(null)}
                        className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded-full text-xs font-black uppercase tracking-wider hover:bg-black hover:text-white transition-all cursor-pointer bg-white"
                        title={isEn ? "Return to Drawer Category" : "回到本品类柜抽屉"}
                      >
                        <span>{isEn ? "Back to Drawer" : "回到抽屉"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* CENTER PIECE MAIN LAYOUT CORE */}
                    <div className="w-full max-w-4xl mx-auto flex flex-col justify-center items-center my-auto py-10 px-4 sm:px-12 select-text">
                      
                      {/* PROJECT HEADING (Stacked EN / ZH) */}
                      {selectedProjectItemId !== 'note-f1' && (
                        <h1 className="text-3xl sm:text-5xl font-serif font-black text-neutral-900 text-center tracking-tight leading-tight mb-6">
                          {details.titleZh}
                          {details.titleEn && details.titleEn !== details.titleZh && (
                            <span className="block text-xl sm:text-2xl font-sans font-light tracking-normal text-neutral-500 mt-2">
                              {details.titleEn}
                            </span>
                          )}
                        </h1>
                      )}

                      {selectedProjectItemId !== 'note-f1' && (
                        <div className="w-16 h-1 bg-black/80 rounded-full mb-8" />
                      )}

                      {/* DESIGN DESCRIPTION */}
                      {selectedProjectItemId !== 'note-f1' && (
                        <div className="text-xs sm:text-sm font-sans text-neutral-600 text-center leading-relaxed max-w-2xl mx-auto mb-8">
                          <p className="font-semibold text-neutral-800 mb-2">{details.descZh}</p>
                          {details.descEn && details.descEn !== details.descZh && (
                            <p className="text-neutral-500 font-normal text-[11px] sm:text-xs">{details.descEn}</p>
                          )}
                        </div>
                      )}

                      {/* DETAILED SPECIFICATION CARD */}
                      {selectedProjectItemId !== 'note-f1' && (
                        <div 
                          id="museum-spec-index-card"
                          className="w-full max-w-lg bg-white p-5 sm:p-6 text-left font-mono text-[10px] sm:text-xs text-neutral-500 rounded-sm mb-12 select-text"
                        >
                          {/* Project Heading Row inside Card */}
                          <div className="mb-4">
                            <span className="block text-[8px] uppercase tracking-widest text-[#B33E2B] font-black mb-1">PROJECT TITLE ｜ 项目名称</span>
                            <span className="block font-serif text-sm sm:text-base font-black text-neutral-800 tracking-tight leading-none uppercase">
                              {getProjectCardMetadata(selectedProjectItemId, activeProjectItem, isEn).name}
                            </span>
                          </div>

                          {/* Middle attributes layout */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 border-t border-neutral-150 pt-3">
                            <div>
                              <span className="block text-[8px] uppercase tracking-widest text-neutral-400 font-bold mb-0.5">TYPE ｜ 门类</span>
                              <span className="block font-sans text-xs font-semibold text-neutral-700">
                                {getProjectCardMetadata(selectedProjectItemId, activeProjectItem, isEn).type}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="block text-[8px] uppercase tracking-widest text-neutral-400 font-bold mb-0.5">
                                  {selectedProjectItemId === 'obj-f8' 
                                    ? "THEATER SCALE ｜ 剧场规模" 
                                    : (selectedProjectItemId && ['obj-f13', 'obj-f14', 'obj-f15', 'obj-f16', 'obj-f17'].includes(selectedProjectItemId))
                                    ? "ACADEMIC ｜ 学术设计"
                                    : "PLOT AREA ｜ 占地"}
                                </span>
                                <span className="block font-sans text-xs font-semibold text-neutral-700">
                                  {getProjectCardMetadata(selectedProjectItemId, activeProjectItem, isEn).plotArea}
                                </span>
                              </div>
                              <div>
                                <span className="block text-[8px] uppercase tracking-widest text-neutral-400 font-bold mb-0.5">
                                  {(selectedProjectItemId && ['obj-f13', 'obj-f14', 'obj-f15', 'obj-f16', 'obj-f17'].includes(selectedProjectItemId))
                                    ? "INSTRUCTOR ｜ 指导"
                                    : "BUILDING AREA ｜ 建面"}
                                </span>
                                <span className="block font-sans text-xs font-semibold text-neutral-700">
                                  {getProjectCardMetadata(selectedProjectItemId, activeProjectItem, isEn).buildingArea}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 border-t border-neutral-150 pt-3 mt-3">
                            <div>
                              <span className="block text-[8px] uppercase tracking-widest text-neutral-400 font-bold mb-0.5">ROLE ｜ 角色职能</span>
                              <span className="block font-sans text-xs font-semibold text-neutral-700">
                                {getProjectCardMetadata(selectedProjectItemId, activeProjectItem, isEn).role}
                              </span>
                            </div>
                            <div>
                              <span className="block text-[8px] uppercase tracking-widest text-neutral-400 font-bold mb-0.5">DATE ｜ 周期时段</span>
                              <span className="block font-sans text-xs font-semibold text-neutral-700">
                                {getProjectCardMetadata(selectedProjectItemId, activeProjectItem, isEn).date}
                              </span>
                            </div>
                          </div>

                          <div className="border-t border-neutral-150 pt-3 mt-3">
                            <span className="block text-[8px] uppercase tracking-widest text-neutral-400 font-bold mb-0.5">LOCATION ｜ 物理区位</span>
                            <span className="block font-sans text-xs font-semibold text-neutral-700">
                              {getProjectCardMetadata(selectedProjectItemId, activeProjectItem, isEn).location}
                            </span>
                          </div>

                          <div className="border-t border-neutral-150 pt-3 mt-3">
                            <span className="block text-[8px] uppercase tracking-widest text-[#B33E2B] font-black mb-1">CONTRIBUTION ｜ 主要贡献与涉足模块</span>
                            <span className="block font-sans text-xs font-semibold text-neutral-700 leading-relaxed">
                              {getProjectCardMetadata(selectedProjectItemId, activeProjectItem, isEn).contribution}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* CONDITIONAL MEDIA CONTAINER: VIDEO OR IMAGE PILE */}
                      {dbItem && dbItem.videoUrl ? (() => {
                        const bvidMatch = dbItem.videoUrl.match(/video\/(BV[a-zA-Z0-9]+)/);
                        const bvid = bvidMatch ? bvidMatch[1] : "";
                        const tMatch = dbItem.videoUrl.match(/t=([0-9.]+)/);
                        const tVal = tMatch ? Math.floor(parseFloat(tMatch[1])) : 0;

                        return (
                          <div id="notes-video-player-container" className="w-full max-w-2xl flex flex-col gap-3 mt-6">
                            <div className="text-[10px] font-mono font-black uppercase text-[#B33E2B] tracking-wider mb-1 leading-none">
                              {isEn ? "✦ ACTIVE VIDEO EMBED" : "✦ 视频作品放映厅"}
                            </div>
                            <div className="w-full aspect-video rounded-lg overflow-hidden bg-black border-[3px] border-black shadow-[4px_4px_0_rgba(0,0,0,1)] relative">
                              {bvid ? (
                                <iframe 
                                  src={`//player.bilibili.com/player.html?bvid=${bvid}&p=1&high_quality=1&autoplay=1&t=${tVal}`}
                                  scrolling="no" 
                                  border="0" 
                                  frameBorder="no" 
                                  frameSpacing="0" 
                                  allowFullScreen={true}
                                  allow="autoplay; encrypted-media; fullscreen"
                                  sandbox="allow-top-navigation allow-same-origin allow-scripts allow-forms allow-popups"
                                  className="w-full h-full"
                                />
                              ) : (
                                <div className="text-stone-500 font-mono text-xs flex items-center justify-center w-full h-full">
                                  VIDEO URL UNRESOLVED
                                </div>
                              )}
                            </div>
                            {/* User helper tip */}
                            <div className="text-[10px] sm:text-xs text-stone-550 font-sans font-medium flex items-start gap-1 px-1 py-1 leading-relaxed text-left">
                              <span className="text-stone-700 font-bold shrink-0">💡 {isEn ? "Tip:" : "小提示："}</span>
                              <span className="opacity-85">
                                {isEn 
                                  ? "Web browsers block video sound by default. Simply click the speaker icon in the bottom-right control bar of the Bilibili player to turn on audio!"
                                  : "若播放时没有声音，只需轻点播放器右下角的喇叭图标即可开启声音体验！"}
                              </span>
                            </div>
                          </div>
                        );
                      })() : (
                        /* STACKED IMAGE GALLERIES PILE CONTAINER */
                        <div className="relative w-full max-w-6xl h-80 sm:h-[450px] flex items-end justify-center mt-6 sm:mt-12 overflow-visible">
                          
                          {/* Visual stacking guide in text for raw sketches */}
                          <div className="absolute -top-12 flex items-center gap-2 select-none pointer-events-none text-neutral-350 font-mono text-[9px] uppercase tracking-widest z-10">
                            <span>✦</span>
                            <span>{isEn ? "Click any print below to expand details" : "点击下方任一相纸放大阅读细节"}</span>
                            <span>✦</span>
                          </div>

                          {/* Pile deck cards loop */}
                          {imagesList.map((imgUrl, iIdx) => {
                            const count = imagesList.length;
                            const ratio = count > 1 ? (iIdx / (count - 1)) - 0.5 : 0;
                            
                            // Organic noise variables to break mathematical symmetry for realistic disorder
                            const noiseRot = [-7, 5, -3, 8, -5][iIdx % 5];
                            const noiseX = [-1.5, 2.5, -0.5, 3.5, -2][iIdx % 5]; // in vw
                            const noiseY = [14, -18, 5, 22, -7][iIdx % 5]; // in px
                            
                            // Drooping parabolic fan formula matching the reference's heap curves
                            const rotation = ratio * 48 + noiseRot;
                            const translateX = `${ratio * 22 + noiseX}vw`;
                            
                            // Parabolic arch pushes outer items lower, plus noise
                            const baseHeightArch = ratio * ratio * 75;
                            const translateY = baseHeightArch + noiseY;
                            
                            const hoverTranslateX = `${ratio * 18 + noiseX * 0.8}vw`;

                            // Staggered slow float and wobble to add gentle life
                            const floatDuration = 4.5 + (iIdx * 0.8);
                            const wobbleDuration = 5.5 + (iIdx * 1.1);
                            const floatOffset = 16 + (iIdx * 2.5);
                            const wobbleOffset = 4 + (iIdx * 1.1);
                            
                            return (
                              <motion.div
                                key={iIdx}
                                initial={{ rotate: rotation, x: translateX, y: translateY, scale: 0.95 }}
                                animate={{ 
                                  x: translateX,
                                  y: [translateY - floatOffset, translateY + floatOffset],
                                  rotate: [rotation - wobbleOffset, rotation + wobbleOffset]
                                }}
                                transition={{
                                  y: {
                                    duration: floatDuration,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                    delay: iIdx * 0.35
                                  },
                                  rotate: {
                                    duration: wobbleDuration,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                    delay: iIdx * 0.55
                                  },
                                  x: { type: "spring", stiffness: 95, damping: 21 },
                                  scale: { duration: 0.25 }
                                }}
                                whileHover={{ 
                                  rotate: rotation * 0.25, 
                                  x: hoverTranslateX, 
                                  y: translateY - 55, 
                                  scale: 1.08, 
                                  zIndex: 45,
                                  transition: { 
                                    type: "spring",
                                    stiffness: 170,
                                    damping: 17,
                                    y: { duration: 0.25 },
                                    rotate: { duration: 0.25 }
                                  }
                                }}
                                onClick={() => setZoomedImageUrl(imgUrl)}
                                className="absolute w-[240px] sm:w-[320px] md:w-[380px] lg:w-[420px] aspect-4/3 overflow-hidden rounded-xs shadow-[8px_8px_20px_rgba(0,0,0,0.14)] hover:shadow-[16px_16px_32px_rgba(0,0,0,0.24)] transition-all cursor-zoom-in filter ease-out"
                                style={{ zIndex: 10 + iIdx }}
                              >
                                <img 
                                  src={imgUrl} 
                                  alt="" 
                                  className="w-full h-full object-cover filter saturate-[0.85] contrast-[1.02] select-none"
                                  referrerPolicy="no-referrer"
                                />
                              </motion.div>
                            );
                          })}
                        </div>
                      )}

                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>

            {/* High precision fullscreen image magnifier zoom modal */}
            <AnimatePresence>
              {zoomedImageUrl && (() => {
                const currentImagesList = selectedProjectItemId && activeCategoryId !== 'images'
                  ? getProjectImagesById(selectedProjectItemId)
                  : [];
                const currentZoomedIndex = currentImagesList.indexOf(zoomedImageUrl);

                return (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm cursor-zoom-out"
                    onClick={() => setZoomedImageUrl(null)}
                  >
                    {/* Top corner branding and close instruction */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-[10px] text-neutral-400 font-mono uppercase tracking-[0.2em] pointer-events-none select-none z-50">
                      <span className="opacity-60">{isEn ? "ARCHIVAL IMAGE PREVIEW" : "档案图像预览"}</span>
                      <span className="bg-white/10 text-white/80 px-2.5 py-1 rounded-sm border border-white/10 backdrop-blur-md">
                        {isEn ? "CLICK OUTSIDE OR ESC TO CLOSE" : "点击空白或 ESC 关闭"}
                      </span>
                    </div>

                    {/* Image enclosure to prevent closing on image click */}
                    <div className="relative flex items-center justify-center max-w-[85vw] max-h-[85vh] z-10">
                      <motion.img
                        key={zoomedImageUrl}
                        initial={{ scale: 0.95, opacity: 0.8 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0.8 }}
                        transition={{ type: "spring", damping: 28, stiffness: 200 }}
                        src={zoomedImageUrl} 
                        alt="Magnified showcase detail" 
                        className="max-w-full max-h-[80vh] object-contain select-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] filter brightness-100 contrast-[1.02] cursor-default border border-white/5 rounded-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentImagesList.length > 1 && currentZoomedIndex !== -1) {
                            const nextIndex = (currentZoomedIndex + 1) % currentImagesList.length;
                            setZoomedImageUrl(currentImagesList[nextIndex]);
                          }
                        }}
                        referrerPolicy="no-referrer"
                        title={currentImagesList.length > 1 ? (isEn ? "Click image to advance next" : "点击图片切换至下一张") : undefined}
                      />
                    </div>

                    {/* Left Arrow Button */}
                    {currentImagesList.length > 1 && currentZoomedIndex !== -1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const prevIndex = (currentZoomedIndex - 1 + currentImagesList.length) % currentImagesList.length;
                          setZoomedImageUrl(currentImagesList[prevIndex]);
                        }}
                        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white/40 hover:text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm active:scale-95 shadow-lg cursor-pointer z-50 group"
                        title={isEn ? "Previous Image" : "前一张"}
                        aria-label="Previous image"
                      >
                        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
                      </button>
                    )}

                    {/* Right Arrow Button */}
                    {currentImagesList.length > 1 && currentZoomedIndex !== -1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const nextIndex = (currentZoomedIndex + 1) % currentImagesList.length;
                          setZoomedImageUrl(currentImagesList[nextIndex]);
                        }}
                        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white/40 hover:text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm active:scale-95 shadow-lg cursor-pointer z-50 group"
                        title={isEn ? "Next Image" : "后一张"}
                        aria-label="Next image"
                      >
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    )}

                    {/* Modern bottom status badge */}
                    {currentImagesList.length > 1 && currentZoomedIndex !== -1 && (
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-neutral-900/80 px-4 py-2 rounded-full border border-white/10 text-neutral-300 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] flex items-center gap-3 shadow-2xl select-none pointer-events-none z-50">
                        <span className="text-amber-500 font-bold">● PHOTO STACK</span>
                        <span>{currentZoomedIndex + 1} / {currentImagesList.length}</span>
                      </div>
                    )}
                  </motion.div>
                );
              })()}
            </AnimatePresence>

            {/* Bottom-centered Close Drawer Button with interactive hint */}
            {!selectedProjectItemId && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-auto w-full max-w-xs sm:max-w-md px-4">
                <button
                  id="close-drawer-bottom-btn"
                  onClick={() => onCloseDrawer?.()}
                  className="group flex items-center gap-2 px-5 py-3 rounded-full bg-white text-[#1A1A1A] border-[3px] border-black text-xs font-black font-sans uppercase tracking-widest hover:bg-black hover:text-white hover:-translate-y-0.5 active:translate-y-0 shadow-none filter drop-shadow-[5px_5px_0_rgba(239,68,68,1)] transition-all cursor-pointer"
                >
                  <span>{isEn ? "Close Drawer" : "关闭抽屉"}</span>
                  <X className="w-4 h-4 stroke-[3.2px] group-hover:rotate-90 transition-transform duration-300" />
                </button>
                <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest font-black select-none pointer-events-none text-center">
                  {areThumbnailsStacked 
                    ? (isEn ? "[ Click stacked photos to scatter | Click empty area to return ]" : "[ 点击叠放的照片自动散开 | 点击空白区域退回 ]")
                    : (isEn ? "[ Drag cards to arrange | Click to inspect | Click empty area to gather ]" : "[ 自由拖拽照片摆放 | 点击翻阅详情 | 点击空白区域聚拢叠放 ]")
                  }
                </span>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Absolute floating brand headers (top corner) */}
            <div className="absolute top-6 left-6 z-50 select-none flex flex-col items-start gap-1">
              <h1 className="font-sans font-black text-xl sm:text-2xl text-[#1A1A1A] tracking-widest uppercase">
                Penny's gallery
              </h1>
              <span className="font-mono text-[13px] uppercase tracking-[0.2em] text-[#B33E2B] font-black scale-95 origin-left select-none pointer-events-none">
                {isEn ? "DESIGN ARCHIVE & EXHIBITION" : "设计师学术手绘与实践陈列馆"}
              </span>
            </div>

            {/* Absolute floating controls (rendered only in normal state) */}
            <div className="absolute top-6 right-6 z-50">
              <button
                id="top-toggle-lang"
                onClick={onToggleLang}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-neutral-200 hover:bg-neutral-50 active:bg-neutral-100 transition-colors bg-white shadow-xs cursor-pointer focus:outline-hidden"
                title={isEn ? "Switch Language" : "切换语言"}
              >
                <Globe2 className="w-4 h-4 text-[#1A1A1A]" />
              </button>
            </div>

            {/* ----------------- CORE INTERACTIVE CABINET AREA ----------------- */}
            <main className="relative z-10 w-full max-w-5xl xl:max-w-6xl flex items-center justify-center pt-12 pb-0 px-4 sm:px-6 transition-transform duration-500">
              <div className="w-full overflow-visible">
                <FloorCabinet 
                  onOpenDrawer={onOpenDrawer} 
                  isEn={isEn} 
                  onOpenBooklet={(id) => setActiveBookletId(id)}
                  activeCategoryId={activeCategoryId}
                  onPulledDrawerChange={setPulledDrawerId}
                  onOpenGuestbook={() => setIsGuestbookOpen(true)}
                />
              </div>
            </main>

            {/* Interactive booklet details overlays */}
            <AnimatePresence>
              {selectedBooklet && (
                <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
                  
                  {/* Dark glass background sheet */}
                  <motion.div
                    id="booklet-overlay-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setActiveBookletId(null)}
                    className="absolute inset-0 bg-[#1e1e1d]/50 backdrop-blur-xs cursor-pointer"
                  />

                  {activeBookletId === 'about-artist' ? (
                  /* Custom Vertical Resume layout - Blank white, portrait standard aspect ratio fitting the short edge of viewport, with vertical scrolling */
                  <motion.div
                    id="about-artist-resume-panel"
                    initial={{ scale: 0.94, opacity: 0, y: 15 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.94, opacity: 0, y: 15 }}
                    transition={{ type: 'spring', damping: 22, stiffness: 200 }}
                    className="relative bg-white text-stone-950 portrait:w-[94vw] portrait:h-[82vh] landscape:h-[93vh] landscape:aspect-[210/297] rounded-sm shadow-2xl border border-stone-200 flex flex-col overflow-hidden max-w-full font-serif"
                  >
                    {/* Minimalist Close button */}
                    <button
                      id="close-resume-btn"
                      onClick={() => setActiveBookletId(null)}
                      className="absolute top-4 right-4 z-50 p-1.5 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors cursor-pointer bg-white/80 backdrop-blur-xs border border-stone-200 shadow-sm"
                    >
                      <X className="w-5 h-5 stroke-[2px]" />
                    </button>

                    {/* Resume paper content (with vertical scroll) */}
                    <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-10 sm:py-12 md:px-14 md:py-16 text-stone-900 select-text leading-relaxed">
                      {isEn ? (
                        /* ENGLISH RESUME (Pages 4, 5, 6) */
                        <div className="space-y-8 text-stone-900 font-sans">
                          {/* Header */}
                          <div className="text-center pb-4 border-b border-stone-300">
                            <h1 className="text-3xl font-black tracking-wide text-stone-900 font-serif">BI, JINGYI</h1>
                            <p className="text-[10px] text-stone-500 mt-2 font-mono">
                              Email: jingyib0918@163.com &nbsp;|&nbsp; Phone: +86 18850571159 &nbsp;|&nbsp; Birthdate: Sept. 18th, 1993
                            </p>
                          </div>

                          {/* EDUCATION */}
                          <div>
                            <h2 className="text-sm font-bold tracking-wider text-stone-800 border-b border-stone-200 pb-1 mb-4 uppercase">
                              EDUCATION
                            </h2>
                            <div className="space-y-6">
                              {/* Edu 1 */}
                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>08/2017 - 05/2019</span>
                                  <span>Massachusetts, U.S.</span>
                                </div>
                                <div className="mt-1 font-bold text-xs text-stone-900">Graduate School of Design, Harvard University</div>
                                <div className="text-stone-600 text-xs mt-0.5 font-serif italic">Master of Architecture (M.Arch II)</div>
                                <div className="text-[11px] text-stone-500 mt-1 pl-4 leading-normal">
                                  Selected Advanced Technology Courses: Digital Media II, Entanglement of Movement and Meaning: The Architect, Spatial Perception and the Technological Body, Near Drawing.
                                </div>
                              </div>

                              {/* Edu 2 */}
                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>09/2018 - 01/2019</span>
                                  <span>Massachusetts, U.S.</span>
                                </div>
                                <div className="mt-1 font-bold text-xs text-stone-900">Massachusetts Institute of Technology</div>
                                <div className="text-stone-600 text-xs mt-0.5">Cross Registration</div>
                                <div className="text-[11px] text-stone-500 mt-1 pl-4 leading-normal">
                                  Elective Course: Introduction to Shape Grammars.
                                </div>
                              </div>

                              {/* Edu 3 */}
                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>09/2012 - 06/2017</span>
                                  <span>Fujian, China</span>
                                </div>
                                <div className="mt-1 font-bold text-xs text-stone-900">Huaqiao University</div>
                                <div className="text-stone-600 text-xs mt-0.5">Bachelor of Architecture, GPA: 3.58 / 4.0 ｜ Major Ranking: 2 / 98</div>
                              </div>

                              {/* Edu 4 */}
                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>03/2015 - 07/2015</span>
                                  <span>Taiwan, China</span>
                                </div>
                                <div className="mt-1 font-bold text-xs text-stone-900">Chung Yuan Christian University</div>
                                <div className="text-stone-600 text-xs mt-0.5 font-serif italic">Exchange Program in Architecture, GPA: 3.96 / 4.0</div>
                              </div>
                            </div>
                          </div>

                          {/* INTERNSHIP & WORK */}
                          <div>
                            <h2 className="text-sm font-bold tracking-wider text-stone-800 border-b border-stone-200 pb-1 mb-4 uppercase">
                              INTERNSHIP &amp; WORK
                            </h2>
                            <div className="space-y-6">
                              {/* Job 1 */}
                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>08/2023 - 01/2026</span>
                                  <span>Fujian, China</span>
                                </div>
                                <div className="mt-1 font-bold text-xs text-stone-900">Xiamen University Tan Kah Kee College</div>
                                <div className="text-stone-600 text-xs mt-0.5 font-serif italic">Architectural Lecturer | The Head of First-Grade Design Curriculum Group</div>
                                <div className="text-[11px] text-stone-500 mt-1 leading-normal flex items-start gap-1">
                                  <span className="text-[#10b981] font-bold">✧</span>
                                  <span>Teaching Courses: Fundamentals of Architecture Design I/II, History of Foreign (Countries) Ancient Architecture, Architectural Imaging Practice, Architecture Economy and Management, Professional English for Architecture, Principle of Residential Architectural Design, Special Subject of Urban Design, Architecture Tours (general education).</span>
                                </div>
                              </div>

                              {/* Job 2 */}
                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>03/2023 - 05/2023</span>
                                  <span>Shanghai, China</span>
                                </div>
                                <div className="mt-1 font-bold text-xs text-stone-900">AIM Architecture</div>
                                <div className="text-stone-600 text-xs mt-0.5 font-serif italic">Designer</div>
                                <div className="space-y-1 mt-1 pl-4 text-[11px] text-stone-500">
                                  <div className="flex items-start gap-1 font-bold text-stone-700">
                                    <span className="text-stone-400 font-bold">✧</span>
                                    <span>Project: Shenzhen Bay China Resources Cultural Plaza Interior Design (under construction)</span>
                                  </div>
                                  <div className="pl-4 space-y-0.5 text-stone-500">
                                    <div>• Contributed to the concept design of the urban school and retail spaces within the commercial complex.</div>
                                    <div>• Assisted in spatial strategy development aligning commercial operation needs and architectural design intent.</div>
                                  </div>
                                </div>
                              </div>

                              {/* Job 3 */}
                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>11/2019 - 04/2022</span>
                                  <span>Shanghai, China</span>
                                </div>
                                <div className="mt-1 font-bold text-xs text-stone-900">Neri&amp;Hu Design and Research Office</div>
                                <div className="text-stone-600 text-xs mt-0.5 font-serif italic">Designer</div>
                                
                                <div className="space-y-3 mt-2 text-[11px] text-stone-500">
                                  <div>
                                    <div className="flex items-start gap-1 font-bold text-stone-700">
                                      <span className="text-stone-400">✧</span>
                                      <span>Project: Qiantan 31 Cultural Center Interior Design (built)</span>
                                    </div>
                                    <div className="pl-4 space-y-0.5 mt-0.5 text-stone-500">
                                      <div>• Contributed to schematic design and design development for Hall A and Hall B (Black Box Theatre).</div>
                                      <div>• Acted as a design coordinator between clients, local design institutes and multidisciplinary consultants (structure, MEP, theater).</div>
                                      <div>• Participated in weekly coordination meetings, technical reviews and design alignment.</div>
                                      <div>• Conducted regular site inspections to ensure design intent implementation during construction.</div>
                                    </div>
                                  </div>

                                  <div>
                                    <div className="flex items-start gap-1 font-bold text-stone-700">
                                      <span className="text-stone-400">✧</span>
                                      <span>Project: Architectural and Interior Renovation of Huafang Dormitory at Taizhou Road (Government’s Approval Stage)</span>
                                    </div>
                                    <div className="pl-4 space-y-0.5 mt-0.5 text-stone-500">
                                      <div>• Independently led concept design for new extensions and renovation of existing buildings.</div>
                                      <div>• Prepared presentation materials for government approval, ensuring compliance with planning and regulatory requirements.</div>
                                    </div>
                                  </div>

                                  <div>
                                    <div className="flex items-start gap-1 font-bold text-stone-700">
                                      <span className="text-stone-400">✧</span>
                                      <span>Project: Niccolo Phuket Resort Architectural and Interior Design</span>
                                    </div>
                                    <div className="pl-4 space-y-0.5 mt-0.5 text-stone-500">
                                      <div>• In charge of master planning and public area design for a luxury resort project.</div>
                                      <div>• Coordinated with client team and hotel operator, translating brand standards into spatial solutions.</div>
                                    </div>
                                  </div>

                                  <div>
                                    <div className="flex items-start gap-1 font-bold text-stone-700">
                                      <span className="text-stone-400">✧</span>
                                      <span>Project: Tuwaiq Palace Hotel Expansion Competition, Saudi Arabia</span>
                                    </div>
                                    <div className="pl-4 space-y-0.5 mt-0.5 text-stone-500">
                                      <div>• Contributed to the preliminary research, the concept brainstorm, 3D models of existing buildings, terrain study, massing study, elevation design, public space layout design and final graphic presentation.</div>
                                    </div>
                                  </div>

                                  <div>
                                    <div className="flex items-start gap-1 font-bold text-stone-700">
                                      <span className="text-stone-400">✧</span>
                                      <span>Other projects</span>
                                    </div>
                                    <div className="pl-4 text-stone-500">
                                      Camerich Haus (built), Louis Vuitton Flagship Elevation Design Competition, Jeju villas.
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Job 4 */}
                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>06/2018 - 08/2018</span>
                                  <span>New York, U.S.</span>
                                </div>
                                <div className="mt-1 font-bold text-xs text-stone-900">OMA New York</div>
                                <div className="text-stone-600 text-xs mt-0.5 font-serif italic">Intern</div>
                                <div className="space-y-1 mt-1 pl-4 text-[11px] text-stone-500">
                                  <div className="flex items-start gap-1 font-bold text-stone-700">
                                    <span className="text-stone-400 font-bold">✧</span>
                                    <span>Project: Eagle+West Tower (built)</span>
                                  </div>
                                  <div className="pl-4">
                                    • Contributed to massing study, facade study, Logo design, detail design, drawings, process models and the Schematic Design Phase final model.
                                  </div>
                                </div>
                              </div>

                              {/* Job 5 */}
                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>09/2016</span>
                                  <span>Fujian, China</span>
                                </div>
                                <div className="mt-1 font-bold text-xs text-stone-900">Xiamen BIAD Architecture Design Co. Ltd</div>
                                <div className="text-stone-600 text-xs mt-0.5 font-serif italic">Intern</div>
                                <div className="space-y-1 mt-1 pl-4 text-[11px] text-stone-500">
                                  <div className="flex items-start gap-1 font-bold text-stone-700">
                                    <span className="text-stone-400 font-bold">✧</span>
                                    <span>Project: Urban Design of an Exhibition Park in Pingtan &amp; 2nd Phase of Xinyang Affordable Housing in Xiamen</span>
                                  </div>
                                  <div className="pl-4">
                                    • Contributed to preliminary research, material collection, case studies, information analysis and diagram drawings.
                                  </div>
                                </div>
                              </div>

                              {/* Job 6 */}
                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>10/2018 - 12/2018</span>
                                  <span>Massachusetts, U.S.</span>
                                </div>
                                <div className="mt-1 font-bold text-xs text-stone-900">Harvard Yenching Library</div>
                                <div className="text-stone-600 text-xs mt-0.5 font-serif italic">Student Assistant</div>
                              </div>
                            </div>
                          </div>

                          {/* COMPETITION & WORKSHOP & PUBLICATION */}
                          <div>
                            <h2 className="text-sm font-bold tracking-wider text-stone-800 border-b border-stone-200 pb-1 mb-4 uppercase">
                              COMPETITION &amp; WORKSHOP &amp; PUBLICATION
                            </h2>
                            <div className="space-y-6">
                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>02/2020 - 06/2020</span>
                                  <span>Shanghai, China</span>
                                </div>
                                <div className="mt-1 font-bold text-xs text-stone-900">Thresholds: Space, Time and Practice</div>
                                <div className="text-[11px] text-stone-500 mt-1 pl-4 leading-normal">
                                  <div className="font-bold text-stone-700">• The monograph of Neri&amp;Hu design and research office</div>
                                  <div className="mt-0.5">Content production: redrew the drawings of Neri&amp;Hu's works from different periods.</div>
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>02/2019 - 04/2019</span>
                                  <span>Massachusetts, U.S.</span>
                                </div>
                                <div className="mt-1 font-bold text-xs text-stone-900">Space, Movement, and the Technological Body: A Tribute to the Bauhaus</div>
                                <div className="text-[11px] text-stone-500 mt-1 pl-4 leading-normal">
                                  <div className="font-bold text-stone-700">• Project: Sound Map, group work in 2</div>
                                  <div className="mt-0.5 text-stone-500">
                                    Participated in practice and rehearsal all semester and successfully finished the final performance at GSD, Harvard. The VR-based immersive Dance-Sound visualization system transforms Oskar Schlemmer's experimental Bauhaus dances into a novel three-dimensional interactive experience. Utilizing Kagura software, it arranged corresponding instrumental elements in the virtual space, captured human movement and gestures through camera lenses to trigger sounds, and employed Spectrum, a music visualizer, to convert audio into imagery for spatial projection. Through a semester of technical experimentation with tools like Arduino and TouchDesigner, the project culminated in a final performance at the Harvard Graduate School of Design's tribute to Bauhaus commemorative evening event.
                                  </div>
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>08/2016</span>
                                  <span>Fujian, China</span>
                                </div>
                                <div className="mt-1 font-bold text-xs text-stone-900 font-sans">UIA-HYP Cup 2016 International Student Competition in Architectural Design</div>
                                <div className="text-[11px] text-stone-500 mt-1 pl-4 leading-normal">
                                  <div className="font-bold text-stone-700">• Project: Who Am I, group work in 4</div>
                                  <div className="mt-0.5 text-stone-500">Took part in the whole competition process and contributed to the translation work.</div>
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>07/2015 - 08/2015</span>
                                  <span>Fujian, China</span>
                                </div>
                                <div className="mt-1 font-bold text-xs text-stone-900">Koolangsu Four-university Joint Workshop</div>
                                <div className="text-[11px] text-stone-500 mt-1 pl-4 text-stone-500">
                                  Participated in the mapping of Longtou Road, its façade renovation for the World Heritage Application of the Koolangsu island, historic architecture survey and the mapping of the Koolangsu island.
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>07/2014 - 12/2015</span>
                                  <span>Fujian, China</span>
                                </div>
                                <div className="mt-1 font-bold text-xs text-stone-900 font-sans">National Training Program of Innovation and Entrepreneurship for College Students</div>
                                <div className="text-[11px] text-stone-500 mt-1 pl-4 leading-normal">
                                  <div className="font-bold text-stone-700">• Project: Study on Sustainable Development of Xiamen Old Town Style Buildings, group work in three</div>
                                  <div className="mt-0.5 text-stone-500">Participated in the preliminary investigation of the current site situation and research about historical information of Yingping Old Town in Xiamen. Contributed to the analysis, proposals and the final presentation.</div>
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>04/2014</span>
                                  <span>Fujian, China</span>
                                </div>
                                <div className="mt-1 font-bold text-xs text-stone-900">The First Cross-Strait Design Build Competition—City of Light</div>
                                <div className="text-[11px] text-stone-500 mt-1 pl-4 leading-normal">
                                  <div className="font-bold text-stone-700">• Project: House of Cards</div>
                                  <div className="mt-0.5 text-stone-500">Excellent Work Prize, group work in eight</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* HONOR */}
                          <div>
                            <h2 className="text-sm font-bold tracking-wider text-stone-800 border-b border-stone-200 pb-1 mb-4 uppercase">
                              HONOR
                            </h2>
                            <ul className="space-y-3 text-[11px] text-stone-600 font-sans">
                              <li className="flex justify-between items-baseline gap-4">
                                <div className="flex items-start gap-2">
                                  <span className="w-1 h-1 rounded-full bg-stone-400 mt-[5.5px] shrink-0" />
                                  <span>
                                    <span className="font-bold text-stone-900">2016</span> — School Merit Award, in recognition of comprehensive performance
                                  </span>
                                </div>
                                <span className="text-xs font-bold text-stone-900 shrink-0 text-right">Fujian, China</span>
                              </li>
                              <li className="flex justify-between items-baseline gap-4">
                                <div className="flex items-start gap-2">
                                  <span className="w-1 h-1 rounded-full bg-stone-400 mt-[5.5px] shrink-0" />
                                  <span>
                                    <span className="font-bold text-stone-900">2013-2015</span> — First Prize of Merit Academic Scholarship for THREE years
                                  </span>
                                </div>
                              </li>
                              <li className="flex justify-between items-baseline gap-4">
                                <div className="flex items-start gap-2">
                                  <span className="w-1 h-1 rounded-full bg-stone-400 mt-[5.5px] shrink-0" />
                                  <span>
                                    <span className="font-bold text-stone-900">2014-2015</span> — Merit Student of Architecture School for TWO years
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>

                          {/* SKILLS */}
                          <div>
                            <h2 className="text-sm font-bold tracking-wider text-stone-800 border-b border-stone-200 pb-1 mb-4 uppercase">
                              SKILLS
                            </h2>
                            <div className="space-y-3 text-xs text-stone-700 pl-2">
                              <div>
                                <span className="font-bold text-stone-900">Language:</span> Chinese, English
                              </div>
                              <div className="leading-relaxed">
                                <span className="font-bold text-stone-900">Software:</span> Microsoft Office/ AutoCAD/ Sketchup/ Rhino/ Grasshopper/ Photoshop/ Lightroom/ InDesign/ Illustrator/ Enscape/ Vray/ Revit/ TouchDesigner/ Twinmotion/ AIGC/ AI coding tools/ Figma
                              </div>
                              <div>
                                <span className="font-bold text-[#10b981]">Certificate:</span> Teacher Qualification of Higher Education Institutions of the People's Republic of China
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* CHINESE RESUME (Pages 1, 2, 3) */
                        <div className="space-y-8 text-stone-900 font-sans">
                          {/* Header */}
                          <div className="text-center pb-4 border-b border-stone-300">
                            <h1 className="text-3xl font-extrabold tracking-wide text-stone-900 font-serif">毕静怡</h1>
                            <p className="text-[11px] text-stone-500 mt-2 font-mono">
                              电子邮箱: jingyib0918@163.com &nbsp;|&nbsp; 手机: +86 18850571159 &nbsp;|&nbsp; 生日: 1993 年 9 月 18 日
                            </p>
                          </div>

                          {/* 教育背景 */}
                          <div>
                            <h2 className="text-sm font-bold tracking-wider text-stone-800 border-b border-stone-200 pb-1 mb-4 uppercase">
                              教育背景
                            </h2>
                            <div className="space-y-6">
                              {/* Edu item 1 */}
                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>08/2017 - 05/2019</span>
                                  <span>麻省，美国</span>
                                </div>
                                <div className="mt-1 font-bold text-xs">哈佛大学设计学院</div>
                                <div className="text-stone-600 text-xs mt-0.5 font-serif italic">建筑学硕士 (M.Arch II)</div>
                                <div className="text-[11px] text-stone-500 mt-1 pl-4 leading-normal">
                                  部分前沿技术课程：数字媒体 II, 运动与意义的交织：建筑师、空间感知与身体技术, 近似绘画。
                                </div>
                              </div>

                              {/* Edu item 2 */}
                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>09/2018 - 01/2019</span>
                                  <span>麻省，美国</span>
                                </div>
                                <div className="mt-1 font-bold text-xs font-sans">麻省理工学院</div>
                                <div className="text-stone-600 text-xs mt-0.5">校选课</div>
                                <div className="text-[11px] text-stone-500 mt-1 pl-4 leading-normal">
                                  选修课程：形状语法导论
                                </div>
                              </div>

                              {/* Edu item 3 */}
                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>09/2012 - 06/2017</span>
                                  <span>福建，中国</span>
                                </div>
                                <div className="mt-1 font-bold text-xs animate-none">华侨大学建筑学院</div>
                                <div className="text-stone-600 text-xs mt-0.5">建筑学学士，GPA: 3.58 / 4.0 ｜ 专业排名: 2 / 98</div>
                              </div>

                              {/* Edu item 4 */}
                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>03/2015 - 07/2015</span>
                                  <span>台湾，中国</span>
                                </div>
                                <div className="mt-1 font-bold text-xs">台湾中原大学</div>
                                <div className="text-stone-600 text-xs mt-0.5 font-serif italic">交换生项目，GPA: 3.96 / 4.0</div>
                              </div>
                            </div>
                          </div>

                          {/* 工作 & 实习 */}
                          <div>
                            <h2 className="text-sm font-bold tracking-wider text-stone-800 border-b border-stone-200 pb-1 mb-4 uppercase">
                              工作 &amp; 实习
                            </h2>
                            <div className="space-y-6">
                              {/* Job 1 */}
                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>08/2023 - 01/2026</span>
                                  <span>福建，中国</span>
                                </div>
                                <div className="mt-1 font-bold text-xs">厦门大学嘉庚学院</div>
                                <div className="text-stone-600 text-xs mt-0.5 font-serif italic">建筑学专任教师 ｜ 大一设计课教研组组长</div>
                                <div className="text-[11px] text-stone-500 mt-1 leading-normal flex items-start gap-1">
                                  <span className="text-[#10b981] font-bold">✧</span>
                                  <span>开设课程: 基础建筑设计 I/II，外国古代建筑史， 建筑影像实验， 建筑经济管理， 建筑学专业英语， 居住建筑设计原理，城市设计专题，建筑旅游（公共选修课）</span>
                                </div>
                              </div>

                              {/* Job 2 */}
                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>03/2023 - 05/2023</span>
                                  <span>上海，中国</span>
                                </div>
                                <div className="mt-1 font-bold text-xs">AIM 恺慕建筑设计事务所</div>
                                <div className="text-stone-600 text-xs mt-0.5 font-serif italic">设计师</div>
                                <div className="space-y-1 mt-1 pl-4 text-[11px] text-stone-500">
                                  <div className="flex items-start gap-1 font-bold text-stone-700">
                                    <span className="text-stone-400 font-bold">✧</span>
                                    <span>项目：深圳湾华润文化广场室内设计</span>
                                  </div>
                                  <div className="pl-4 text-stone-500">
                                    参与商业综合体中城市校园与零售空间的概念设计。
                                  </div>
                                </div>
                              </div>

                              {/* Job 3 */}
                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>11/2019 - 04/2022</span>
                                  <span>上海，中国</span>
                                </div>
                                <div className="mt-1 font-bold text-xs">如恩设计研究室</div>
                                <div className="text-stone-600 text-xs mt-0.5 font-serif italic">设计师</div>
                                
                                <div className="space-y-3 mt-2 text-[11px] text-stone-500">
                                  <div>
                                    <div className="flex items-start gap-1 font-bold text-stone-700">
                                      <span className="text-stone-400">✧</span>
                                      <span>项目：前滩 31 号文演中心室内设计 (建成）</span>
                                    </div>
                                    <div className="pl-4 space-y-0.5 mt-0.5 text-stone-500">
                                      <div>• 参与了 A 厅和 B 厅（黑匣子剧场）的方案设计及扩初设计。</div>
                                      <div>• 担任客户、当地设计院及多专业顾问（结构、机电、剧场）之间的设计协调人。</div>
                                      <div>• 参与每周的协调会议、技术评审及设计对齐工作。</div>
                                      <div>• 定期进行现场检查，确保施工过程中设计意图得以落实。</div>
                                    </div>
                                  </div>

                                  <div>
                                    <div className="flex items-start gap-1 font-bold text-stone-700">
                                      <span className="text-stone-400">✧</span>
                                      <span>项目：尼依格罗普吉岛度假村</span>
                                    </div>
                                    <div className="pl-4 space-y-0.5 mt-0.5 text-stone-500">
                                      <div>• 负责某豪华度假区项目的总体规划和公共区域设计。</div>
                                      <div>• 与客户团队及酒店管理方协调合作，将品牌标准转化为空间解决方案。</div>
                                    </div>
                                  </div>

                                  <div>
                                    <div className="flex items-start gap-1 font-bold text-stone-700">
                                      <span className="text-stone-400">✧</span>
                                      <span>项目：泰州路华纺小区更新改造 （政府报批）</span>
                                    </div>
                                    <div className="pl-4 space-y-0.5 mt-0.5 text-stone-500">
                                      <div>• 独立主导了新建扩建部分及现有建筑改造的概念设计。</div>
                                      <div>• 准备用于政府审批的汇报文本，确保符合规划及法规要求。</div>
                                    </div>
                                  </div>

                                  <div>
                                    <div className="flex items-start gap-1 font-bold text-stone-700">
                                      <span className="text-stone-400">✧</span>
                                      <span>项目: 沙特阿拉伯 Tuwaiq 宫酒店扩建竞赛</span>
                                    </div>
                                    <div className="pl-4 space-y-0.5 mt-0.5 text-stone-500">
                                      <div>• 负责前期调研、概念头脑风暴 、现状模型建模、场地地形研究、体块推敲、立面设计、公共区域平面设计以及最终汇报文本。</div>
                                    </div>
                                  </div>

                                  <div>
                                    <div className="flex items-start gap-1 font-bold text-stone-700">
                                      <span className="text-stone-400">✧</span>
                                      <span>其它参与项目</span>
                                    </div>
                                    <div className="pl-4 text-stone-500">
                                      锐驰北京驿站（建成）、LV 太古汇旗舰店立面竞赛、韩国济州岛别墅区
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Job 4 */}
                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>06/2018 - 08/2018</span>
                                  <span>纽约，美国</span>
                                </div>
                                <div className="mt-1 font-bold text-xs font-sans">OMA 大都会事务所</div>
                                <div className="text-stone-600 text-xs mt-0.5 font-serif italic">实习生</div>
                                <div className="space-y-1 mt-1 pl-4 text-[11px] text-stone-500">
                                  <div className="flex items-start gap-1 font-bold text-stone-700">
                                    <span className="text-stone-400 font-bold">✧</span>
                                    <span>项目: Eagle+West 大厦（建成）</span>
                                  </div>
                                  <div className="pl-4 text-stone-500">
                                    参与方案体块推敲，立面设计，项目 Logo 设计，细部设计，负责过程推敲模型以及 Schematic Design Phase 的最终实体模型。
                                  </div>
                                </div>
                              </div>

                              {/* Job 5 */}
                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>09/2016</span>
                                  <span>福建，中国</span>
                                </div>
                                <div className="mt-1 font-bold text-xs font-sans">厦门佰地建筑设计有限公司</div>
                                <div className="text-stone-600 text-xs mt-0.5 font-serif italic">实习生</div>
                                <div className="space-y-1 mt-1 pl-4 text-[11px] text-stone-500">
                                  <div className="flex items-start gap-1 font-bold text-stone-700">
                                    <span className="text-stone-400 font-bold">✧</span>
                                    <span>项目: 平潭会展公园城市设计 &amp; 厦门新阳经济适用房 2 期</span>
                                  </div>
                                  <div className="pl-4 text-stone-500">
                                    参与前期分析，资料收集，案例分析。
                                  </div>
                                </div>
                              </div>

                              {/* Job 6 */}
                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>10/2018 - 12/2018</span>
                                  <span>麻省，美国</span>
                                </div>
                                <div className="mt-1 font-bold text-xs font-sans">哈佛燕京图书馆</div>
                                <div className="text-stone-600 text-xs mt-0.5 font-serif italic">学生助理</div>
                              </div>
                            </div>
                          </div>

                          {/* 竞赛 & 工作坊 & 出版物 */}
                          <div>
                            <h2 className="text-sm font-bold tracking-wider text-stone-800 border-b border-stone-200 pb-1 mb-4 uppercase">
                              竞赛 &amp; 工作坊 &amp; 出版物
                            </h2>
                            <div className="space-y-6">
                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>02/2020 - 06/2020</span>
                                  <span>上海，中国</span>
                                </div>
                                <div className="mt-1 font-extrabold text-xs">《间：空间、时间与实践》</div>
                                <div className="text-[11px] text-stone-500 mt-1 pl-4 leading-normal">
                                  <div className="font-bold text-stone-700">• 如恩设计研究室作品集</div>
                                  <div className="mt-0.5 text-stone-500">内容绘制、排版：重新绘制如恩不同时期的作品的图纸。</div>
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>02/2019 - 04/2019</span>
                                  <span>麻省，美国</span>
                                </div>
                                <div className="mt-1 font-extrabold text-xs">空间，运动，以及技术性身体：致敬包豪斯</div>
                                <div className="text-[11px] text-stone-500 mt-1 pl-4 leading-normal">
                                  <div className="font-bold text-stone-700">• 项目：Sound Map, 两人团队</div>
                                  <div className="mt-0.5 text-stone-500">
                                    基于 VR 的沉浸式“舞蹈-声音”可视化系统，将包豪斯 Oscar Schlemmer 的实验性舞蹈转换为全新的三维交互体验。利用 Kagura 软件，在虚拟空间中布置相应的乐器元素，通过相机镜头捕捉人体运动和手势触发声音，并利用 Spectrum - Music Visualizer 软件将声音转换为图像，并实现空间投影。通过一学期的技术性实验，如 Arduino, TouchDesigner 等工具的尝试，实现在哈佛大学设计学院包豪斯 100 周年纪念晚会的最终表演。
                                  </div>
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>08/2016</span>
                                  <span>福建，中国</span>
                                </div>
                                <div className="mt-1 font-extrabold text-xs">2016 年霍普杯国际大学生建筑设计竞赛</div>
                                <div className="text-[11px] text-stone-500 mt-1 pl-4 leading-normal">
                                  <div className="font-bold text-stone-700">• 项目：Who Am I，4 人小组合作</div>
                                  <div className="mt-0.5 text-stone-500">全程参与竞赛流程，并负责部分翻译工作。</div>
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>07/2015 - 08/2015</span>
                                  <span>福建，中国</span>
                                </div>
                                <div className="mt-1 font-extrabold text-xs font-sans">鼓浪屿申遗四校工作坊</div>
                                <div className="text-[11px] text-stone-500 mt-1 pl-4 text-stone-500">
                                  参与龙头路测绘以及立面更新设计，助力鼓浪屿申请世界文化遗产。
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>07/2014 - 12/2015</span>
                                  <span>福建，中国</span>
                                </div>
                                <div className="mt-1 font-extrabold text-xs">国家级大学生创新创业训练计划</div>
                                <div className="text-[11px] text-stone-500 mt-1 pl-4 leading-normal">
                                  <div className="font-bold text-stone-700">• 项目研究：厦门旧城区风貌建筑可持续发展研究， 三人团队</div>
                                  <div className="mt-0.5 text-stone-500 font-medium">参与厦门市营平老城现状的初步调研及历史资料研究，协助完成分析、方案制定及最终汇报展示。</div>
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between text-xs font-bold text-stone-900">
                                  <span>04/2014</span>
                                  <span>福建，中国</span>
                                </div>
                                <div className="mt-1 font-extrabold text-xs">首届海峡两岸光明之城实体建构竞赛</div>
                                <div className="text-[11px] text-stone-500 mt-1 pl-4 leading-normal">
                                  <div className="font-bold text-stone-700">• 项目：纸牌屋；</div>
                                  <div className="mt-0.5 text-stone-500">佳作奖，八人团队</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 荣誉 */}
                          <div>
                            <h2 className="text-sm font-bold tracking-wider text-stone-800 border-b border-stone-200 pb-1 mb-4 uppercase">
                              荣誉
                            </h2>
                            <ul className="space-y-3 text-[11px] text-stone-600 font-sans">
                              <li className="flex justify-between items-baseline gap-4">
                                <div className="flex items-start gap-2">
                                  <span className="w-1 h-1 rounded-full bg-stone-400 mt-[5.5px] shrink-0" />
                                  <span>
                                    <span className="font-bold text-stone-900">2016</span> — 华侨大学理工科综合成绩优秀学生
                                  </span>
                                </div>
                                <span className="text-xs font-bold text-stone-900 shrink-0 text-right">福建，中国</span>
                              </li>
                              <li className="flex justify-between items-baseline gap-4">
                                <div className="flex items-start gap-2">
                                  <span className="w-1 h-1 rounded-full bg-stone-400 mt-[5.5px] shrink-0" />
                                  <span>
                                    <span className="font-bold text-stone-900">2013-2015</span> — 连续三年获得华侨大学校一等奖学金
                                  </span>
                                </div>
                              </li>
                              <li className="flex justify-between items-baseline gap-4">
                                <div className="flex items-start gap-2">
                                  <span className="w-1 h-1 rounded-full bg-stone-400 mt-[5.5px] shrink-0" />
                                  <span>
                                    <span className="font-bold text-stone-900">2014-2015</span> — 连续两年获得华侨大学建筑学院优秀学生
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>

                          {/* 技能与证书 */}
                          <div>
                            <h2 className="text-sm font-bold tracking-wider text-stone-800 border-b border-stone-200 pb-1 mb-4 uppercase">
                              技能与证书
                            </h2>
                            <div className="space-y-3 text-xs text-stone-700 pl-2">
                              <div>
                                <span className="font-bold text-stone-900">语言：</span> 中文，英文
                              </div>
                              <div className="leading-relaxed">
                                <span className="font-bold text-stone-900">软件：</span> Microsoft Office/ AutoCAD/ Sketchup/ Rhino/ Grasshopper/ Photoshop/ Lightroom/ InDesign/ Illustrator/ Enscape/ Vray/ Revit/ TouchDesigner/ Twinmotion/ AIGC/ AI coding tools/ Figma
                              </div>
                              <div>
                                <span className="font-bold text-[#10b981]">证书：</span> 中华人民共和国高等学校教师资格
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  /* Publication Paper container */
                  <motion.div
                    id="booklet-overlay-panel"
                    initial={{ scale: 0.94, opacity: 0, y: 15 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.94, opacity: 0, y: 15 }}
                    transition={{ type: 'spring', damping: 22, stiffness: 200 }}
                    className={`relative bg-[#fbfbfa] w-full max-w-lg rounded-xl p-5 sm:p-7 shadow-none border-[3.5px] border-black flex flex-col justify-between gap-5 overflow-hidden filter drop-shadow-[4px_4px_0_rgba(0,0,0,1)] ${selectedBooklet.colorClass}`}
                  >
                    {/* Inset paper texture background styling */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />

                    <div className="space-y-4 relative z-10 font-sans">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[9px] font-mono text-white bg-black uppercase px-2 py-0.5 rounded-sm font-black">
                            {isEn ? 'EXHIBIT DETAILS' : '展项详实目录手册'}
                          </span>
                          <h2 className="text-xl font-bold text-stone-900 mt-2">
                            {isEn ? selectedBooklet.titleEn : selectedBooklet.titleZh}
                          </h2>
                          <h3 className="text-xs font-sans italic font-bold text-stone-500 mt-0.5">
                            {isEn ? selectedBooklet.subEn : selectedBooklet.subZh}
                          </h3>
                        </div>
                        
                        {/* Close manual */}
                        <button
                          id="close-booklet-btn"
                          onClick={() => setActiveBookletId(null)}
                          className="p-1 text-black hover:bg-neutral-100 transition-colors border-[2.5px] border-black rounded-lg cursor-pointer bg-white shrink-0 shadow-[2px_2px_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)]"
                        >
                          <X className="w-5 h-5 stroke-[2.5px]" />
                        </button>
                      </div>

                      <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1 text-stone-850 text-xs sm:text-xs font-sans font-bold leading-relaxed text-justify select-text pl-0.5">
                        {(isEn ? selectedBooklet.contentEn : selectedBooklet.contentZh).map((para, pIdx) => (
                          <p key={pIdx}>
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Publication Footer */}
                    <div className="relative z-10 flex justify-between items-center text-[9px] font-mono text-stone-400 border-t-[2.5px] border-black pt-4 mt-2 select-none pointer-events-none">
                      <span className="font-extrabold text-black">RCA EXHIBITION 03 ｜ B-0{Object.keys(bookletsData).indexOf(activeBookletId || '') + 1}</span>
                      <span className="font-black text-black">CATALOGUE ENTRY</span>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>

    {/* Guestbook Modal Overlay */}
    <AnimatePresence>
      {isGuestbookOpen && (
        <GuestbookModal
          isOpen={isGuestbookOpen}
          onClose={() => setIsGuestbookOpen(false)}
          isEn={isEn}
        />
      )}
    </AnimatePresence>

    </div>
  );
}
