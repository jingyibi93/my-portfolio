/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ObjectItem, ImageItem, FragmentItem, NoteItem, ExperimentItem, CVSection } from './types';

export const OBJECTS_DATA: ObjectItem[] = [
  {
    id: 'obj-8',
    titleZh: '前滩 31 文演中心',
    titleEn: 'QUANTAN 31 CULTURAL CENTER',
    date: '2019.11-2022.04',
    descriptionZh: '项目位于浦东前滩，建成后将成为中国最大的剧院之一，可容纳 2500 座。项目集酒店、办公、商业及剧院功能于一体，旨在为浦东居民带来全新的都市生活方式。文化中心的设计灵感源于古语“arena”（竞技场/圆形剧场），用以描绘建筑内部的观演体验。剧院大厅则呼应“帷幕”的概念，既满足了声学要求，又营造出独特的内部空间体验。',
    descriptionEn: 'Located at Qiantan, Pudong, the project is going to be one of the biggest theaters in China, with 2500 seats in total. Incorporating hotel, office, commercial functions and theater, the complex tries to bring new urban lifestyles to residents in Pudong. For the cultural center, an ancient word "arena" describes the audience experience within the building. And the theater hall echos to the concept of "curtain" that not only meets acoustic requirement but also brings a unique interior experience.',
    materialsZh: '主创团队: Neri&Hu 如恩设计 | 项目地点: 上海浦东',
    materialsEn: 'Design Team: Neri&Hu | Location: Pudong, Shanghai',
    dimensions: 'TOTAL AREA: 20,000 m²',
    image: 'https://i.postimg.cc/jSnWQQDc/cover.jpg',
    galleryImages: [
      'https://i.postimg.cc/jSnWQQDc/cover.jpg',
      'https://i.postimg.cc/9XNF8w5s/1.jpg',
      'https://i.postimg.cc/1RY5CVhN/2.jpg',
      'https://i.postimg.cc/xqVN7XJ5/3.jpg',
      'https://i.postimg.cc/GtRP6gyc/4.jpg',
      'https://i.postimg.cc/ZKCqTMRW/5.jpg',
      'https://i.postimg.cc/bvK99wYG/6.jpg',
      'https://i.postimg.cc/JnZc6Ctj/7.jpg',
      'https://i.postimg.cc/FKHDFHG0/8.jpg',
      'https://i.postimg.cc/28mxMn87/9.png'
    ],
    detailsZh: [
      '主创团队：担任 Neri&Hu 如恩设计项目首席设计师 (Chief Designer)，全面把控方案深化、空间比例及硬装构造美学落地。',
      '核心贡献：深度主导方案设计 (Schematic Design)、扩初设计 (DD Drawings) 与复杂的机电结构管线空间深度协调。',
      '全案涉入：涉入软装设计与家具选型设计 (FFE Design) 全链条，使“帷幕”与“竞技场”的戏剧空间语言贯穿观演始终。'
    ],
    detailsEn: [
      'Lead Role: Served as Chief Designer at Neri&Hu, managing complex conceptual pipelines, spatial ratios, and detailed interior mockups.',
      'Core Contribution: Directed schematic phases, DD Drawing production files, and extensive multidisciplinary engineering coordination.',
      'Holistic Integration: Integrated meticulous FFE design to ensure the semantic play between "curtains" and "arenas" resonates seamlessly.'
    ]
  },
  {
    id: 'obj-9',
    titleZh: '华纺小区改造',
    titleEn: 'HUAFANG DORMITORY RENOVATION',
    date: '09/2020-12/2021',
    descriptionZh: '“被重新发现的、非现代的废墟不仅是某种症候，更是进行意义探索与生产的新场域。”该项目旨在原废弃的日式工厂宿舍区的废墟之上，构建一个新的城市目的地。其核心理念是打造一座“门径”，用以处理新旧之间的关系，为整个片区塑造出一个标志性的城市构筑物。',
    descriptionEn: '“Rediscovered, off-modern ruins are not only symptoms but also sites for a new exploration and production of meanings.” The project aims to build a new urban destination on the ruins of an abandon dormitory compound of Japanese factory. The main idea is to create “Gateway” to deal with the relationship between old and new, shaping an urban artifact for the compound.',
    materialsZh: '主创团队: Neri&Hu 如恩设计 | 项目地点: 上海',
    materialsEn: 'Design Team: Neri&Hu | Location: Shanghai',
    dimensions: 'PLOT AREA: 4800m² BUILDING AREA: 8030m²',
    image: 'https://i.postimg.cc/DyZ2kr35/20211216-Birdeye.jpg',
    galleryImages: [
      'https://i.postimg.cc/DyZ2kr35/20211216-Birdeye.jpg',
      'https://i.postimg.cc/mZSDGZzC/20211220-Exterior-Perspective.jpg',
      'https://i.postimg.cc/dtM9gBCC/20211216-Perspective-1.jpg',
      'https://i.postimg.cc/bwh3STYg/20211216-Perspective-2.jpg',
      'https://i.postimg.cc/fWdc79r8/20211216-Perspective-3.jpg',
      'https://i.postimg.cc/yd09d7zD/3-1.jpg',
      'https://i.postimg.cc/vH69K8pQ/3-2.jpg',
      'https://i.postimg.cc/WbJrypQN/3-3.jpg',
      'https://i.postimg.cc/vZF9wFss/3-4.jpg',
      'https://i.postimg.cc/Dwks3kTd/3-5.jpg',
      'https://i.postimg.cc/x1vm0xfH/3-5-1.jpg',
      'https://i.postimg.cc/t4QPGQjh/3-5-2.jpg',
      'https://i.postimg.cc/jSHfsgxc/3-6.jpg'
    ],
    detailsZh: [
      '主创角色：担任 Neri&Hu 如恩设计项目主创设计师 (Chief Designer at Neri&Hu)。',
      '核心贡献：负责概念设计 (Concept Design)、视觉呈现 (Graphic Presentation) 与各专业团队的项目协调工作 (Coordination)。',
      '新旧共生：通过打造“门径”重构场地秩序，将日式工厂旧宿舍废墟整合为富有温度的城市更新地。'
    ],
    detailsEn: [
      'Lead Role: Served as Chief Designer at Neri&Hu for the renovation pipeline.',
      'Core Contribution: Meticulously handled Concept Design, Graphic Presentation, and multidisciplinary design coordination.',
      'Old & New Symbiosis: Reordered the ruined Japanese factory dormitory under an inspiring "Gateway" conceptual framework.'
    ]
  },
  {
    id: 'obj-10',
    titleZh: '文化都市',
    titleEn: 'THE CULTURE CITY',
    date: '03/2023-05/2023',
    descriptionZh: '该项目邀请参观者开启一场文化漫步，体验多种类型的文化空间：商业集市式的文化中心、灵活的多功能文化场所，以及纯粹的文化空间。',
    descriptionEn: 'This project invites visitors to embark on a cultural promenade, where they will experience diverse typologies of cultural spaces: commercial marketplace-style cultural hubs, flexible multi-functional cultural venues, and pure cultural spaces.',
    materialsZh: '主创团队: AIM Architecture 恺慕建筑 | 项目地点: 深圳',
    materialsEn: 'Design Team: AIM Architecture | Location: Shenzhen',
    dimensions: 'PROJECT AREA: 2000m²',
    image: 'https://i.postimg.cc/wvTL4XdL/2-1.jpg',
    galleryImages: [
      'https://i.postimg.cc/wvTL4XdL/2-1.jpg',
      'https://i.postimg.cc/MTKV378Q/2-2.jpg',
      'https://i.postimg.cc/268h9QfW/2-3.jpg',
      'https://i.postimg.cc/ydYcpmzS/2-4.jpg',
      'https://i.postimg.cc/CM2kJnrQ/2-13.jpg',
      'https://i.postimg.cc/vBq9J4YD/2-5.jpg',
      'https://i.postimg.cc/SsNC16p1/2-6.jpg',
      'https://i.postimg.cc/NMJT3KsB/2-7.jpg',
      'https://i.postimg.cc/6q8RtBqC/2-8.jpg',
      'https://i.postimg.cc/CLfD2M97/2-14.jpg',
      'https://i.postimg.cc/5yDztDQB/2-9.jpg',
      'https://i.postimg.cc/rs74p7RY/2-10.jpg',
      'https://i.postimg.cc/J7FZKHYG/2-11.jpg',
      'https://i.postimg.cc/J0SXhSBM/2-12.jpg'
    ],
    detailsZh: [
      '主创角色：担任 AIM Architecture 恺慕建筑设计项目主创设计师 (Chief Designer at AIM Architecture)。',
      '核心贡献：负责概念设计 (Concept Design) 及视觉呈现 (Graphic Presentation) 工作。',
      '空间序曲：设计了一条引人入胜的文化漫步道，和谐串联集市商业、活性多功能与纯粹艺术三大空间门类。'
    ],
    detailsEn: [
      'Lead Role: Appointed as Chief Designer at AIM Architecture for the Shenzhen Bay pipeline.',
      'Core Contribution: Meticulously lead the Concept Design phase and handled high-end artistic Graphic Presentations.',
      'Cultural Promenade: Structured an immersive spatial sequence bridging commercial forums, adaptive multi-functional sites, and gallery spaces.'
    ]
  },
  {
    id: 'obj-11',
    titleZh: '尼依格罗普吉岛度假村',
    titleEn: 'NICCOLO PHUKET RESORT',
    date: '11/2020-10/2021',
    descriptionZh: '项目位于普吉岛——一个每年吸引大量游客到访的著名度假胜地。场地位于山顶，享有海景与林景的双重优势。为区分游客与旅者，整体设计聚焦于在后疫情时代营造归属感，吸引旅者来到这座“岛中之岛”，探索一种别致的生活方式。',
    descriptionEn: 'The project is located at Phuket where lots of tourists come every year as a famous resort destination. And the site has the advantage of both sea view and forest view on a hill peak. To differentiate tourists and travelers, the whole design focuses on bringing the sense of belonging in the post-pandemic era, which invites traveller to the island within island exploring a chic life.',
    materialsZh: '主创团队: Neri&Hu 如恩设计 | 项目地点: 泰国普吉岛',
    materialsEn: 'Design Team: Neri&Hu | Location: Phuket, Thailand',
    dimensions: 'PLOT AREA: 51100m² BUILDING AREA: 19774m²',
    image: 'https://i.postimg.cc/Y216bCgF/20210714-Axon-morning-FOR.jpg',
    galleryImages: [
      'https://i.postimg.cc/Y216bCgF/20210714-Axon-morning-FOR.jpg',
      'https://i.postimg.cc/J7kDRr5S/4-1.jpg',
      'https://i.postimg.cc/L8tPHC9t/4-2.jpg',
      'https://i.postimg.cc/8cBzW37h/20210713-PA-canopy-solid-gl.jpg',
      'https://i.postimg.cc/KcwVC2Zf/20210713-ADD-gl.jpg',
      'https://i.postimg.cc/MTc5YnjV/20210713-lobbyatrium.png',
      'https://i.postimg.cc/8CJkwsFT/20210713-poolbar-KH.jpg',
      'https://i.postimg.cc/bYGMJb7j/20210713-swimming-pool-gl.jpg',
      'https://i.postimg.cc/qq9zXnLD/20210713-grotto-view-2.jpg',
      'https://i.postimg.cc/yW4062w8/20210714-GR-Section.png'
    ],
    detailsZh: [
      '主创角色：担任 Neri&Hu 如恩设计项目主创设计师 (Chief Designer at Neri&Hu)。',
      '核心贡献：精细化处理概念设计 (Concept Design)、视觉呈现 (Graphic Presentation) 以及多专业联合深化协调工作 (Coordination)。',
      '岛中之岛：在优裕的双重景观地貌中，通过细腻的感官边界设计打造一处静谧的、让身心重获归属的后疫情度假秘境。'
    ],
    detailsEn: [
      'Lead Role: Served as Chief Designer at Neri&Hu for Phuket resort masterplan.',
      'Core Contribution: Directed Concept Design execution, visual master-presentations, and comprehensive technical drawings coordination.',
      'Island within Island: Framed an architectural oasis integrating organic coastal topography with bespoke threshold designs to foster genuine sanctuary resonance.'
    ]
  },
  {
    id: 'obj-12',
    titleZh: '西鹰大厦',
    titleEn: 'EAGLE+WEST TOWER',
    date: '06/2018-08/2018',
    descriptionZh: '项目坐落于绿点码头D区，两座分别采用退台金字塔造型及其倒置形态的塔楼彼此精准呼应。作为OMA纽约事务所在布鲁克林的首个落成建筑，该项目旨在激活滨水区的转型，将后工业时代的边缘地带转变为充满活力的社区。两座塔楼之间的空间框出一幅望向曼哈顿的全新视野，将为布鲁克林的天际线增添一道独特的风景。',
    descriptionEn: 'Located at Greenpoint Landing Block D, a ziggurat tower and its inverse tower carefully calibrated to one another. As OMA New York’s first building in Brooklyn, the project aims to activate the transformation of the waterfront from a post-industrial edge to a vibrant neighborhood. The space between two towers frames a new view to Manhattan, which will bring a unique impact on the Brooklyn skyline.',
    materialsZh: '主创团队: OMA New York | 项目地点: 美国伦敦/布鲁克林',
    materialsEn: 'Design Team: OMA New York | Location: Brooklyn, U.S.',
    dimensions: 'PLOT AREA: 89030m² BUILDING AREA: 110711m²',
    image: 'https://i.postimg.cc/NGSnr4TL/6-3.jpg',
    galleryImages: [
      'https://i.postimg.cc/NGSnr4TL/6-3.jpg',
      'https://i.postimg.cc/XY4fySDH/6-5.jpg',
      'https://i.postimg.cc/G90BRYZt/6-6.jpg',
      'https://i.postimg.cc/HWF3nNgZ/6-7.jpg',
      'https://i.postimg.cc/W16rwWks/6-4.jpg',
      'https://i.postimg.cc/fbWf1ncm/6-8.jpg'
    ],
    detailsZh: [
      '主创角色：担任 OMA 纽约事务所设计实习生 (Intern at OMA New York)。',
      '核心贡献：负责体量研究 (Massing Study)、物理模型制作 (Model Making)、标志品牌设计 (Logo Design) 及外立面细部研究 (Facade Study) 等深化工作。',
      '双塔对话：金字塔与倒置梯级建筑群构成的标志性滨水双塔，戏剧化地缝合了后工业化社区结构，并对撞出面向曼哈顿的中介视野。'
    ],
    detailsEn: [
      'Lead Role: Served as Architecture Intern at OMA New York office.',
      'Core Contribution: Contributed to Massing Studies, physically intricate Model Making, initial Brand Logo Development, and high-performance Facade Detail Studies.',
      'Dual Towers: An architectural dialogue between a ziggurat tower and its inverse partner, unlocking framed visual ports toward Manhattan while transforming Brooklyn\'s waterfront.'
    ]
  },
  {
    id: 'obj-13',
    titleZh: '动物世界',
    titleEn: 'ZOOTOPIA',
    date: '03/2015-05/2015',
    descriptionZh: '大多数公共空间都禁止宠物入内。人们在寻求构建环保建筑的同时，也必须考虑动物的需求。让建筑与周遭环境——即动物与自然——融为一体至关重要。试着想象，如果能够将动物的需求与人的需求相结合，我们就能为社区营造出更加生动鲜活的生活场景。',
    descriptionEn: 'Most public spaces must ban pets in. People in search of the construction of environmentally friendly buildings, at the same time, must consider the needs of animals. It is important to make the building blend in with the surrounding: animals and nature. Trying to imagine that if we can combine animals’ needs with people’s needs, we can create a more vivid life scenario for the community.',
    materialsZh: '公司/主创: 本科生学术设计 (Undergraduate Academic) | 项目指导: 黄庆龄 (Ching-Ling Huang) | 项目地点: 台北',
    materialsEn: 'Lead/Firm: Undergraduate Academic | Advisor: Ching-Ling Huang | Location: Taipei',
    dimensions: 'ROLE: Individual ｜ 独立角色',
    image: 'https://i.postimg.cc/bNc6w50Q/zootopia-da.jpg',
    galleryImages: [
      'https://i.postimg.cc/bNc6w50Q/zootopia-da.jpg',
      'https://i.postimg.cc/yNKXZf7b/7-4.jpg',
      'https://i.postimg.cc/5tVsb4Tb/7-5.jpg',
      'https://i.postimg.cc/8z4hRK2d/7-3.png',
      'https://i.postimg.cc/L8Whd5bZ/7-2.jpg',
      'https://i.postimg.cc/SKW4ZKF0/7-1.jpg',
      'https://i.postimg.cc/1XTJGWbs/zoo2.jpg',
      'https://i.postimg.cc/J7ygnJfz/zoo3.jpg',
      'https://i.postimg.cc/cLsghb5k/Screen-Shot-2026-06-01-151427-802.jpg'
    ],
    detailsZh: [
      '主创角色：独立设计人 (Individual Designer)。',
      '项目指导：黄庆龄 (Ching-Ling Huang)。',
      '人宠共生：在设计方案中探索将人与动物的需求和谐融合，创造一个充满生态温度与社区交融的生活剧场。'
    ],
    detailsEn: [
      'Lead Role: Individual Designer.',
      'Project Advisor: Ching-Ling Huang.',
      'Coexistence Design: Explored the organic integration between companion animal welfare and spatial community programs to forge a vivid, biodiverse neighborhood landscape.'
    ]
  },
  {
    id: 'obj-14',
    titleZh: '博物馆岛',
    titleEn: 'MUSEUM ISLAND',
    date: '02/2018-05/2018',
    descriptionZh: '提到博物馆，许多项目往往聚焦于展览空间的空间感受。而该项目位于梅尼尔收藏园区，将着重呈现展品与存储空间组织之间的关系。项目采用模块化的木结构体系，通过每层模块的不同朝向，赋予了建筑灵活性与统一性。',
    descriptionEn: 'When it comes to museums, many projects will focus on the spatial feeling of exhibition spaces. Located at Menil Collection Campus, this project will highlight the relationship between exhibits and organization of storage space. By using module, the project has a method of timber structure. The different directions of module on each level give both flexibility and unity to the building.',
    materialsZh: '公司/主创: 研究生学术设计 (Graduate Academic) | 项目指导: Mark Lee & Sharon Johnston | 项目地点: 休斯敦, 美国',
    materialsEn: 'Lead/Firm: Graduate Academic | Advisor: Mark Lee & Sharon Johnston | Location: Houston, U.S.',
    dimensions: 'ROLE: Individual ｜ 独立角色',
    image: 'https://i.postimg.cc/6pMv27Zc/8-2.jpg',
    galleryImages: [
      'https://i.postimg.cc/6pMv27Zc/8-2.jpg',
      'https://i.postimg.cc/5NxmyKNh/8-12.jpg',
      'https://i.postimg.cc/5N3HTHnB/8-6.jpg',
      'https://i.postimg.cc/jdKwM6Qf/8-4.jpg',
      'https://i.postimg.cc/KvFk07rr/8-5.jpg',
      'https://i.postimg.cc/xTRkhktF/8-7.jpg',
      'https://i.postimg.cc/rFnV55fP/8-8.jpg',
      'https://i.postimg.cc/7YW45w6L/8-9.jpg',
      'https://i.postimg.cc/nVdbWpq3/8-10.jpg',
      'https://i.postimg.cc/Y00V7LQY/8-11.jpg',
      'https://i.postimg.cc/Mp6Bp0vP/8-0.jpg',
      'https://i.postimg.cc/50CYRnRn/8-1.jpg'
    ],
    detailsZh: [
      '主创角色：独立设计人 (Individual Designer)。',
      '项目指导：Mark Lee & Sharon Johnston。',
      '模块构建：采用木结构模块化设计，通过各层空间朝向的多样旋转，探索灵活性与秩序感的精妙平衡。'
    ],
    detailsEn: [
      'Lead Role: Individual Designer.',
      'Project Advisor: Mark Lee & Sharon Johnston.',
      'Timber Modularity: Employs a structural timber framing module, shifting grid orientation across floor plates to deliver dynamic architectural flexibility and functional unity.'
    ]
  },
  {
    id: 'obj-15',
    titleZh: '连接之处',
    titleEn: 'JOINTS',
    date: '09/2018-12/2018',
    descriptionZh: '在工业革命之前，以家为基地的工作曾是主流的劳动方式。据说在英国，有25%的人居住在办公场所，这意味着一种新型的居住与工作革命正在到来。家具在某种程度上定义着我们的生活方式以及对空间的占用。如何将传统的工业生产与居家办公的新时代相结合，是我项目的核心构想。让生产过程不仅对居民可见，页对城市可见，是将工厂与社会住宅相结合的主要策略。',
    descriptionEn: 'House-based work was the dominant working practice until industrial revolution. It is said that in UK, 25% of people live at their workplace, which means a new type of living and working revolution is coming. Furniture somehow defines our lifestyles and the occupation of space. How to combine traditional industrial production with new era of home-based working is the main idea of my project. Making the process of production visible not only to residents but also to urban is a main strategy to incorporate factories with social housing.',
    materialsZh: '公司/主创: 研究生学术设计 (Graduate Academic) | 项目指导: Alison Brooks | 项目地点: 伦敦, 英国',
    materialsEn: 'Lead/Firm: Graduate Academic | Advisor: Alison Brooks | Location: London, U.K.',
    dimensions: 'ROLE: Individual ｜ 独立角色',
    image: 'https://i.postimg.cc/Cx2tjpRg/9-1.jpg',
    galleryImages: [
      'https://i.postimg.cc/Cx2tjpRg/9-1.jpg',
      'https://i.postimg.cc/J0KkNtg1/9-4.jpg',
      'https://i.postimg.cc/hPPxSbzD/9-5.png',
      'https://i.postimg.cc/4xHYd8Jf/9-6.png',
      'https://i.postimg.cc/xj7zDsNv/9-6-1.jpg',
      'https://i.postimg.cc/3wMdDgRx/9-7.png',
      'https://i.postimg.cc/Wp0SDn1g/9-2.jpg',
      'https://i.postimg.cc/rm1WpfNk/9-3.jpg',
      'https://i.postimg.cc/rFSpmmvv/wei-xin-tu-pian-20260604161035-203-71.jpg'
    ],
    detailsZh: [
      '主创角色：独立设计人 (Individual Designer)。',
      '项目指导：Alison Brooks。',
      '生息共享：通过家具机制重构居住与现代工业混合界限，缝合传统流水线工厂与当代居家办公，将生产透明性全面融入社会性住宅。'
    ],
    detailsEn: [
      'Lead Role: Individual Designer.',
      'Project Advisor: Alison Brooks.',
      'Work-Life Synthesis: Recontextualizes the relationship between workspace and dwelling units through integrated cabinetry, fusing traditional craft production transparently into public social housing plans.'
    ]
  },
  {
    id: 'obj-16',
    titleZh: '城市枢纽',
    titleEn: 'HUB',
    date: '09/2015-11/2015',
    descriptionZh: '城市中的办公空间与公共休闲空间不应被明确界定。在新社会背景下，通勤办公者与高层办公楼之间的关系已仅局限于工作时间。通过公共空间的介入，该设计不仅创造了多样化的办公空间，也为公众提供了一个连接厦门新旧城区的良好枢纽。',
    descriptionEn: 'The office space in the city and the public leisure space should not be clearly defined. The relationship between the office commuter and the high-rise office building in the new society is not just limited to working hours. Through the invasion of public space, the design not only created a diverse working space but also provided a good hub to connect the old and the new of Xiamen for the public.',
    materialsZh: '公司/主创: 本科生学术设计 (Undergraduate Academic) | 项目指导: 洪毅 (Yi Hong) | 项目地点: 厦门',
    materialsEn: 'Lead/Firm: Undergraduate Academic | Advisor: Yi Hong | Location: Xiamen',
    dimensions: 'ROLE: Partner with Xin Zheng ｜ 合作设计',
    image: 'https://i.postimg.cc/DzdyJHHC/10-1.jpg',
    galleryImages: [
      'https://i.postimg.cc/DzdyJHHC/10-1.jpg',
      'https://i.postimg.cc/cCJHNhDz/10-2.png',
      'https://i.postimg.cc/G2L3kz1t/10-6.jpg',
      'https://i.postimg.cc/QMbhx5WL/10-4.jpg',
      'https://i.postimg.cc/TPqYLFFr/10-3.png',
      'https://i.postimg.cc/xCfjKgSL/10-7.jpg',
      'https://i.postimg.cc/P5HqXdFS/10-11.jpg',
      'https://i.postimg.cc/BQH6fjNf/10-8.jpg',
      'https://i.postimg.cc/52m2jDZL/10-9.jpg',
      'https://i.postimg.cc/pLvdWP12/10-10.jpg',
      'https://i.postimg.cc/R0QV6y2r/10-5.jpg'
    ],
    detailsZh: [
      '主创角色：合伙设计人 (Partner with Xin Zheng)。',
      '主要贡献：基地分析、体量形态设计、分析图绘制、三维建模、效果图渲染。',
      '多维衔接：利用公共中庭与休闲露台系统，消解高层办公塔楼的通勤闭塞感，在工作单元中植入微型生态核，建立缝合新老城区的多层枢纽。'
    ],
    detailsEn: [
      'Lead Role: Partner with Xin Zheng.',
      'Key Contribution: Site Analysis, Form/Massing Design, Diagrammatic Drawings, 3D Modeling, Rendering.',
      'Contextual Ingress: Blurs the distinction between private commerce and leisure public voids to cultivate an experiential, multi-layered vertical hub connecting old and new Xiamen.'
    ]
  },
  {
    id: 'obj-17',
    titleZh: '多元城市',
    titleEn: 'DIVERSE CITY',
    date: '03/2016-05/2016',
    descriptionZh: '随着厦门的发展，厦门本岛日益拥挤，城市人口正逐步向郊区迁移。位于杏林湾内海区域的场域已成为新的城市目的地。杏林湾新区的城市设计通过打造多样尺度的街区，并让自然元素有机融入场地，旨在构建一座多元化的城市。通过流畅的慢行步道系统，不同的开放空间被串联起来，为生活提供了更多可能性。',
    descriptionEn: 'With the development of Xiamen, the Xiamen Island is becoming more and more crowded, and the urban population is migrating to the suburbs. Site located at Xinglin Bay inland sea area has become a new city destination. The Xinglin Bay New District urban design created a variety of scale blocks and a natural invasion of the site in order to create a diverse city. Through the streamline slow-moving trail series, different open spaces are combined to provide more possibilities for life.',
    materialsZh: '公司/主创: 本科生学术设计 (Undergraduate Academic) | 项目指导: Yaopeng Li | 项目地点: 厦门',
    materialsEn: 'Lead/Firm: Undergraduate Academic | Advisor: Yaopeng Li | Location: Xiamen',
    dimensions: 'ROLE: Partner with Xin Zheng ｜ 合作设计',
    image: 'https://i.postimg.cc/MGN2GDp8/14-4.jpg',
    galleryImages: [
      'https://i.postimg.cc/MGN2GDp8/14-4.jpg',
      'https://i.postimg.cc/VkFk523Z/14-2.jpg',
      'https://i.postimg.cc/rwyLZsP4/14-3.jpg',
      'https://i.postimg.cc/2SxS3gPc/14-1.jpg'
    ],
    detailsZh: [
      '主创角色：合伙设计人 (Partner with Xin Zheng)。',
      '项目指导：Yaopeng Li。',
      '主要贡献：基地分析、体量形态设计、分析图绘制、三维建模、效果图渲染。'
    ],
    detailsEn: [
      'Lead Role: Partner with Xin Zheng.',
      'Project Advisor: Yaopeng Li.',
      'Key Contribution: Site Analysis\\Form Design\\Diagram Drawing\\Modeling\\Rendering.'
    ]
  }
];

export const IMAGES_DATA: ImageItem[] = [
  {
    id: 'img-5',
    titleZh: '绘画：微光中的见证',
    titleEn: 'Painting: Witness in the Dim Light',
    date: '2019.02 - 2019.04',
    descriptionZh: '此作属于哈佛大学设计研究生院（GSD）《设计师手绘》课程的绘画研究。画面以黑白灰构成，像一段被撕开的记忆。寒冬的雪地、光秃的树枝、延伸却孤独的脚印，构成一种静默的荒凉。画面下方，一只手捧着燃烧的蜡烛，微弱却执拗的火焰，仿佛在为这片冰冷的风景提供唯一的温度与见证。蜡烛既是光源，也是情感的象征——在破碎与寒冷中，仍有人试图守护内心的温热与希望。',
    descriptionEn: 'Created as part of the drawing investigations in the "Drawing for Designer" curriculum at the Harvard Graduate School of Design (GSD). Rendered in monochrome, the image feels like a torn fragment of memory. A snowy field, bare trees, and solitary footprints evoke silence and desolation. In the lower part of the composition, a hand holds a lit candle—its flame small yet stubborn—becoming the only source of warmth in the cold landscape. The candle functions as both light and symbol: a quiet act of resistance, suggesting that even within fragility and loss, hope continues to burn.',
    locationZh: '哈佛大学GSD，美国马萨诸塞州剑桥',
    locationEn: 'Harvard Graduate School of Design, Cambridge, MA',
    camera: 'Graphite and Pencil on Archival Paper',
    image: 'https://i.postimg.cc/Gh5c6gMp/Image2.jpg',
    typeZh: '绘画',
    typeEn: 'Painting',
    instructorZh: 'Ewa Harabasz',
    instructorEn: 'Ewa Harabasz',
    mediumZh: '纸面铅笔手绘 / 炭笔速写',
    mediumEn: 'Graphite Pencil on Paper'
  },
  {
    id: 'img-6',
    titleZh: '绘画：雪夜里的静光',
    titleEn: 'Painting: Silent Glow in a Snowy Night',
    date: '2025.06',
    descriptionZh: '画面以温柔的色彩描绘一座雪夜中的城市：粉紫色的天空下，弯月高悬，雪花静静飘落。城市灯光在远处闪烁，前景的松树被白雪覆盖，像守夜 of 观者。整幅画充满童话般的宁静与安全感，仿佛在喧嚣世界之外，为观者保留了一处安静、柔软的心灵栖息地。',
    descriptionEn: 'This painting portrays a city wrapped in a gentle snowy night. Beneath a pink-violet sky, a crescent moon glows as snow drifts quietly through the air. Distant city lights shimmer softly, while snow-covered pine trees stand in the foreground like silent guardians. The scene feels calm and storybook-like, offering a sense of warmth, protection, and quiet retreat from the outside world.',
    locationZh: '福建厦门',
    locationEn: 'Xiamen, Fujian',
    camera: 'Canvas and Textile Paint // 14 × 13 cm',
    image: 'https://i.postimg.cc/0jvnfqMn/wei-xin-tu-pian-20260601163044-195-71.jpg',
    typeZh: '绘画',
    typeEn: 'Painting',
    instructorZh: '毕静怡 (独立创作)',
    instructorEn: 'Jingyi Bi (Independent)',
    mediumZh: '帆布 / 纺织涂料 14cm✖️13cm',
    mediumEn: 'Textile Paint on Canvas, 14 × 13 cm'
  },
  {
    id: 'img-7',
    titleZh: '绘画：夏池莲影',
    titleEn: 'Painting: Summer Pond Lotus Shadows',
    date: '2025.06',
    descriptionZh: '这幅小幅油画致敬莫奈经典的睡莲主题，以朦胧的蓝紫调铺展水面，用写意的笔触晕染出莲叶与倒影，弱化轮廓、强化光影与色彩的交融，将夏日池畔的静谧与柔化的光影定格在方寸之间，传递出慵懒、治愈的氛围。',
    descriptionEn: 'This small oil painting pays homage to Monet\'s iconic water lily series. It unfolds the water surface with soft blue and purple tones, rendering lily pads and reflections with loose, impressionistic brushstrokes. Blurring clear outlines to highlight the interplay of light and color, it captures the quiet serenity of a summer pond in miniature, evoking a gentle, calming mood.',
    locationZh: '福建厦门',
    locationEn: 'Xiamen, Fujian',
    camera: 'Canvas and Textile Paint // 14 × 13 cm',
    image: 'https://i.postimg.cc/y8Dm0Nph/wei-xin-tu-pian-20260601163045-196-71.jpg',
    typeZh: '绘画',
    typeEn: 'Painting',
    instructorZh: '毕静怡 (独立创作)',
    instructorEn: 'Jingyi Bi (Independent)',
    mediumZh: '帆布 / 纺织涂料 14cm✖️13cm',
    mediumEn: 'Textile Paint on Canvas, 14 × 13 cm'
  },
  {
    id: 'img-8',
    titleZh: '绘画：穹顶下的复调',
    titleEn: 'Painting: Polyphony Under the Dome',
    date: '2019.02 - 2019.04',
    descriptionZh: '此作属于哈佛大学设计研究生院（GSD）《设计师手绘》课程的绘画研究。创作者利用多重线条网格与富有表现力的铅笔阴影，深入探索了高耸穹顶中庭内部的光线反射与动线纵深。画面中重重叠叠的同心弧线与结构辐射线，勾勒出人流游走、手扶梯交错的动态场场域，将理性的建筑透视转化为一种极具表现张力的情感空间。',
    descriptionEn: 'Created as part of the drawing investigations in the "Drawing for Designer" curriculum at the Harvard Graduate School of Design (GSD). The drawing utilizes layers of overlapping grids and expressive graphite tones to dissect light refraction and circulation depth within a monumental vaulted atrium. Dynamic concentric arcs and radial construction lines map out human movement and intersecting elevators, transforming a rational architectural perspective into an evocative, fluid field.',
    locationZh: '哈佛大学GSD，美国马萨诸塞州剑桥',
    locationEn: 'Harvard Graduate School of Design, Cambridge, MA',
    camera: 'Graphite and Pencil on Archival Paper',
    image: 'https://i.postimg.cc/BQVqR7h1/image1.jpg',
    typeZh: '绘画',
    typeEn: 'Painting',
    instructorZh: 'Ewa Harabasz',
    instructorEn: 'Ewa Harabasz',
    mediumZh: '纸面铅笔手绘 / 炭笔速写',
    mediumEn: 'Graphite Pencil on Paper'
  }
];

export const FRAGMENTS_DATA: FragmentItem[] = [
  {
    id: 'frag-1',
    type: 'Academic Study at GSD',
    titleZh: '地穴之塔',
    titleEn: 'BURROW TOWER',
    contentZh: '哈佛大学设计研究生院（GSD）学术设计研究。该项目通过对多孔三维空间的系统化挖掘与结构介入，探讨复杂地表之下垂直空间的可居性及其基础设施的排布可能。',
    contentEn: 'An academic study conducted at Harvard Graduate School of Design (GSD). This project explores the structural interventions and programmatic possibilities of deeply excavated multi-tiered voids, mapping subsurface circulation and microclimatic potentials.',
    date: '02/2018-05/2018',
    locationZh: '美国马萨诸塞州剑桥',
    locationEn: 'Cambridge, Massachusetts',
    instructorZh: 'Andrew Witt',
    instructorEn: 'Andrew Witt',
    partner: 'Xin Zheng',
    image: 'https://i.postimg.cc/TPSVHVWr/20250504-portfolio.jpg',
    camera: 'Partner: Xin Zheng',
    mediumEn: 'Academic Study at GSD',
    mediumZh: '哈佛大学GSD学术研究',
    metadata: 'PARTNER: Xin Zheng // INSTRUCTOR: Andrew Witt'
  },
  {
    id: 'frag-2',
    type: 'Academic Study at GSD',
    titleZh: '竹亭',
    titleEn: 'BAMBOO PAVILION',
    contentZh: '哈佛大学设计研究生院（GSD）Marina Tabassum设计工作室学术设计研究。该项目根植于孟加拉国的本土气候与工艺传统，研究天然竹材作为低碳多功能建材的结构承载力及在当代建筑营造中的技术演变。',
    contentEn: 'An academic study at Harvard Graduate School of Design (GSD) in the Design Studio of Marina Tabassum. Rooted in the regional climate and local material cultures of Bangladesh, this project tests the load-bearing capacities and structural performance of natural bamboo joinery in contemporary architectural design.',
    date: '09/2017',
    locationZh: '孟加拉国',
    locationEn: 'Bangladesh',
    instructorZh: 'Marina Tabassum',
    instructorEn: 'Marina Tabassum',
    partner: 'Design Studio of Marina Tabassum',
    image: 'https://i.postimg.cc/mr5rYV1p/20170929-IMG-1709.jpg',
    camera: 'Partner: Design Studio of Marina Tabassum',
    mediumEn: 'Academic Study at GSD',
    mediumZh: '哈佛大学GSD学术研究',
    metadata: 'PARTNER: Marina Tabassum Design Studio // INSTRUCTOR: Marina Tabassum'
  },
  {
    id: 'frag-3',
    type: 'Academic Study at GSD',
    titleZh: '静物',
    titleEn: 'STILL LIFE',
    contentZh: '哈佛大学设计研究生院（GSD）学术设计研究。本项目以食物作为再现媒介，探讨在过度的视觉控制与人工光照介入下，熟悉的日常物件如何逐渐脱离其原有的文化与功能意义。该作品将再现视为一种主动塑造感知的系统，而非对现实的直接映射，从而揭示视觉经验与真实经验之间的距离。',
    contentEn: 'An academic study conducted at Harvard Graduate School of Design (GSD). This project uses food as a representational medium to examine how excessive visual control and artificial lighting detach familiar objects from their original cultural and functional meanings. The image explores representation not as a mirror of reality, but as a system that actively reshapes perception and produces distance from lived experience.',
    date: '10/2018',
    locationZh: '美国马萨诸塞州剑桥',
    locationEn: 'Cambridge, Massachusetts',
    instructorZh: 'Jennifer Bonner',
    instructorEn: 'Jennifer Bonner',
    partner: 'Xin Zheng',
    image: 'https://i.postimg.cc/XqF3PHfS/wei-xin-tu-pian-20260604161226-8555-46.jpg',
    camera: 'Partner: Xin Zheng',
    mediumEn: 'Academic Study at GSD',
    mediumZh: '哈佛大学GSD学术研究',
    metadata: 'PARTNER: Xin Zheng // INSTRUCTOR: Jennifer Bonner',
    galleryImages: [
      'https://i.postimg.cc/XqF3PHfS/wei-xin-tu-pian-20260604161226-8555-46.jpg',
      'https://i.postimg.cc/cHnV1Krk/wei-xin-tu-pian-20260604161038-206-71.jpg',
      'https://i.postimg.cc/59msBqd1/wei-xin-tu-pian-20260604161318-207-71.jpg'
    ]
  }
];

export const NOTES_DATA: NoteItem[] = [
  {
    id: 'note-1',
    category: 'MIMICRY ｜ 拟态',
    titleZh: '山茶花手机壳',
    titleEn: 'CAMELLIA PHONE CASE',
    date: '2026.06',
    readTime: 'Video ｜ 5 min',
    descriptionZh: '生成式触觉影像《山茶花手机壳》',
    descriptionEn: 'Camellia Phone Case - AI Film',
    contentZh: '生成式触觉影像《山茶花手机壳》，展现了在算法共同演化时的物性生成与拟态重构。在粗砺物质与柔软虚空之间搭建触觉的连通器。\n\n作品灵感来自于在现实社会的无机粗糙实物（如陶石、曲木、混凝土）与智能设备显示屏柔和、灵敏、流体性的数码动态交互之间，寻找一个能够建立起“物理体温”共振的中介。',
    contentEn: 'Camellia Phone Case is an interactive media work exploring computational evolution of tactile surfaces.\n\nThis piece bridges rugged physical concrete structures with digital screen fluidity, searching for tactile warmth and physical resonance in virtual environments.',
    image: 'https://i.postimg.cc/63Cz8Cwr/1.png',
    videoUrl: 'https://www.bilibili.com/video/BV1S4Ew6METQ?t=0'
  },
  {
    id: 'note-2',
    category: 'Web Design/Vibe Coding',
    titleZh: 'The Rotating Archive ｜ 旋转书夹',
    titleEn: 'THE ROTATING ARCHIVE',
    date: '06/2026',
    readTime: 'Video ｜ 4 min',
    descriptionZh: '本网页设计作品以“旋转书夹”作为个人作品集的交互装置，将不同作品以卡片的形式插入其中。访客可以通过旋转书夹浏览作品，也可以在页面中探索隐藏按钮，随机抽取一张作品卡片进行观看。设计将作品集从静态展示转化为一种带有游戏感和发现感的浏览体验。',
    descriptionEn: 'This web design project transforms a personal portfolio into an interactive rotating card holder, where individual works are inserted as collectible cards. Visitors can explore the rotating structure and discover a hidden button that randomly draws one work from the holder for viewing.',
    contentZh: '本网页设计作品以“旋转书夹”作为个人作品集的交互装置，将不同作品以卡片的形式插入其中。访客可以通过旋转书夹浏览作品，也可以在页面中探索隐藏按钮，随机抽取一张作品卡片进行观看。设计将作品集从静态展示转化为一种带有游戏感 and 发现感的浏览体验，使每一次访问都像从一个移动的档案装置中抽取新的创作片段。',
    contentEn: 'This web design project transforms a personal portfolio into an interactive rotating card holder, where individual works are inserted as collectible cards. Visitors can explore the rotating structure and discover a hidden button that randomly draws one work from the holder for viewing. Rather than presenting the portfolio as a static archive, the design creates a playful and exploratory experience, allowing each visit to feel like uncovering a new fragment from a moving collection device.',
    image: 'https://i.postimg.cc/qq4VngVW/Screen-Shot-2026-06-11-150018-875.jpg',
    galleryImages: [
      'https://i.postimg.cc/qq4VngVW/Screen-Shot-2026-06-11-150018-875.jpg',
      'https://i.postimg.cc/L52KfhKb/Screen-Shot-2026-06-11-150030-692.jpg',
      'https://i.postimg.cc/xCKVcM77/Screen-Shot-2026-06-11-150054-714.jpg',
      'https://i.postimg.cc/j5zYLP9f/Screen-Shot-2026-06-11-150115-626.jpg',
      'https://i.postimg.cc/XJw6pdhx/Screen-Shot-2026-06-11-150137-651.jpg',
      'https://i.postimg.cc/0Qp1bD3n/Screen-Shot-2026-06-11-150154-578.jpg',
      'https://i.postimg.cc/qR8HzyYn/Screen-Shot-2026-06-11-150221-843.jpg'
    ],
    videoUrl: 'https://www.bilibili.com/video/BV1WfEv6sEJi/?spm_id_from=333.1387.homepage.video_card.click'
  }
];

/*
    contentEn: 'An academic study conducted at Harvard Graduate School of Design (GSD). This project uses food as a representational medium to examine how excessive visual control and artificial lighting detach familiar objects from their original cultural and functional meanings. The image explores representation not as a mirror of reality, but as a system that actively reshapes perception and produces distance from lived experience.',
    date: '10/2018',
    locationZh: '美国马萨诸塞州剑桥',
    locationEn: 'Cambridge, Massachusetts',
    instructorZh: 'Jennifer Bonner',
    instructorEn: 'Jennifer Bonner',
    partner: 'Xin Zheng',
    image: 'https://i.postimg.cc/XqF3PHfS/wei-xin-tu-pian-20260604161226-8555-46.jpg',
    camera: 'Partner: Xin Zheng',
    mediumEn: 'Academic Study at GSD',
    mediumZh: '哈佛大学GSD学术研究',
    metadata: 'PARTNER: Xin Zheng // INSTRUCTOR: Jennifer Bonner',
    galleryImages: [
      'https://i.postimg.cc/XqF3PHfS/wei-xin-tu-pian-20260604161226-8555-46.jpg',
      'https://i.postimg.cc/cHnV1Krk/wei-xin-tu-pian-20260604161038-206-71.jpg',
      'https://i.postimg.cc/59msBqd1/wei-xin-tu-pian-20260604161318-207-71.jpg'
    ]
  }
];

const DUPLICATE_ESSAYS = [
  {
    id: 'note-old-1',
    category: 'Essay / 随笔',
    titleZh: '论数字界面的触觉化：拉开屏幕上的抽屉',
    titleEn: 'On Tactility in Digital Spaces: Pulling Drawers on a Glass Sheet',
    date: '2026.03',
    readTime: '6 min read',
    descriptionZh: '我们今天的世界被包裹在光滑无暇的平滑玻璃之下。本文深入探讨了我们在屏幕后构建交互时，如何利用重力摩擦力反馈和物理阻尼动画，来对抗“数码麻木感”，召唤出古老柜子与宣纸散落时的细腻联想。',
    descriptionEn: 'Our modern existence is encased beneath smooth, ultra-polished screens. This essay explores how structural friction, dynamic damping springs, and spatial weights inside interactive layout models counteract digital numbness, returning our minds to solid furniture, wood grains, and the smell of ancient archives.',
    contentZh: `设计不应仅仅是视网膜的刺激，它应当是一场多感官的唤醒。
在极简主义美术馆中，空间里的抽屉柜（Cabinet of Curiosities）是绝妙的隐喻：沉重的橡木隔板，由于黄铜导轨多年的氧化，拉开时需要施加带有阻力的恰当外力。这种拉扯，让我们在拉开抽屉的瞬间拥有了一种仪式感和探求欲。而在智能设备冰冷的屏幕上，这一切都消失了，所有的体验被统一归并为一毫米深电容屏上的双指滑动。

在本次网站方案中，我坚持利用拖拽距离、阻尼弹簧（Spring Animations）、和随着抽屉展开而缓缓展开的特制色彩底纹，来重塑这一空间触感。
1. 物性的延迟：抽屉不可能零惯性移动，阻尼应该大，在开始时重，中间轻，结尾带有稳重的金属限位感。
2. 内部的色彩：参考安东尼·阿隆索等艺术家的展陈，单调的外木壳内部往往衬有鲜红、鹅黄、深蓝织物。色彩是在打开的那一瞬才不期而遇的惊喜。
3. 声音的呼应：当一个抽屉拉到底部时，发出的一声微弱沉寂的低音，会让这片平滑空间具备真正的重量。

我们并不想重构无意义的拟物（Skeuomorphism），而是想要抽取它背后的“空间与物理情感特征”——这在充斥着渐变反光和生硬弹窗的AI浪潮时代，或许是一种极其微小、但体温犹存的安静抵抗。`,
    contentEn: `Design must rise above light emissions on our retinas; it must stimulate an archival memory of our palms.
In minimalist exhibition environments, a curated chest of drawer functions as a brilliant metaphor: thick oak, oxidised brass runner channels, and natural timber resistance. Pulling such a horizontal weight demands kinetic intentionality. The gentle friction delivers a micro-ritual of exploring a secret vault. On our portable smart monoliths, this texture is completely erased, flattened into standard swipe logic.

In designing this interaction schema, I integrated responsive finger metrics, custom mass-spring dampers, and a progressive colored textile disclosure to re-sensitise the screen surface:
1. Physical Latency: A solid panel has inertia. Starting the slide should feel slightly weighted, turning fluent, and ending with a damp metallic soft thud.
2. Lining Surprises: Inspired by traditional cabinet designs, minimal shell exteriors often conceal highly saturated velvet linings (deep reds, buttercup yellow, forest greens). These pop up as secret personal landscapes.
3. Micro Acoustic Harmony: Accompanying the visual slide with a deep warm sonic chime when locked establishes a true anchor of virtual gravity.

This is not a simplistic revival of heavy skeuomorphism. It is a precise distillation of "physical emotional triggers," representing a quiet, human-centered resistance in an era increasingly occupied by automated generative templates and flashing AI dashboards.`
  },
  {
    id: 'note-2',
    category: 'Essay / 随笔',
    titleZh: '少即是多：在喧嚣的极简主义中寻找沉默',
    titleEn: 'Less but More: Seeking Silence in Loud Minimalism',
    date: '2025.10',
    readTime: '4 min read',
    descriptionZh: '今日的极简主义往往被扭曲为缺乏细节的“空洞白”，真正的极简是对材质本身力量的无限敬畏，和将注意力高度集中于单线条、重力与自然变化的自我克制。',
    descriptionEn: 'Contemporary minimalism is often diluted into hollow, sterile white canvases. True minimalism arises, instead, from absolute reverence for the inherent power of mediums, and the structural restraint that routes focal concentration onto materials, gravity, and shadows.',
    contentZh: `极简主义的深度，不是一无所有，而是万物在其最优雅沉寂的状态下共振。
许多人理解的现代极简，是彻底抹杀触边、隐藏一切按钮、让房间充斥整齐划一的白乳胶漆。但那不是极简，那是“视觉消毒”。

真正的东方与西方极简设计大师——从安藤忠雄的清水混凝土到包豪斯的钢管皮革，亦或是金泽的手工作坊，共同的核心是尊重材质的原本面部：
- 木就应当展现它由于风干和切割形成的开裂和纤维。
- 泥沙就应该自带由于矿物氧化留下的颗粒与不均斑点。
- 在信息结构上，多层无休止的侧边导航应该退场，让一个简单的抽屉、一张铺平的大纸成为核心。

我们试图构建的，是一个带有呼吸感的抽屉空间。在这里，你不会被推送红点，没有眼花缭乱的广告或统计图表。你只需随意推开一格，看那件物器在正中安卧，这就足够了。这便是对信息流过载的一场安静洗礼。`,
    contentEn: `Minimalist poetry is not sterile starvation; it is the fine vibration of components resting in their most tranquil state.
Modern layouts often mistake minimalism for zero textures, sanitizing all buttons into complete invisibility or blank canvas white grids. That is not restraint; that is sensory isolation.

Great minimalist masterwork—from Tadao Ando's spatial concrete walls to Bauhaus steel frames, or Kyoto wooden joinery—focuses intensely on letting raw materials manifest their authentic identities:
- Wood sheets must expose fine structural checks and natural fibrous paths.
- Clay or sand concrete components should highlight high-pressure air pockets and localized quartz aggregate hues.
- In interface architecture, cluttered multi-tier navigation should dissolve, leaving space for a physical, intuitive cabinet on a heavy stone floor.

We seek an interface that breathes. When you slide open a cabinet cell, an item sits centered in quiet confidence—untouched by loud notifications, badge markers, or telemetry. It is a quiet oasis.
  }
];
*/

export const EXPERIMENTS_DATA: ExperimentItem[] = [
  {
    id: 'exp-1',
    type: 'Academic Study at GSD',
    titleZh: '声音图谱',
    titleEn: 'SOUND MAP',
    descriptionZh: '哈佛大学设计研究生院（GSD）学术设计研究。SOUND MAP 通过对城市声音和物理空间的跨媒介转化，构建出一套将实时音频输入转换为城市空间共鸣关系的多维时空图谱系统。',
    descriptionEn: 'An academic study conducted at Harvard Graduate School of Design (GSD). SOUND MAP maps urban acoustic emissions and physical spaces, developing a multi-dimensional spatial model that translates real-time auditory inputs into relational architectural frequencies.',
    date: '05/2019',
    locationZh: '哈佛大学GSD，美国马萨诸塞州剑桥',
    locationEn: 'Harvard GSD, Cambridge, Massachusetts',
    instructorZh: 'Krzysztof Wodiczko',
    instructorEn: 'Krzysztof Wodiczko',
    partner: 'Xin Zheng',
    image: 'https://i.postimg.cc/SK56t6zd/sound-map.jpg',
    videoUrl: 'https://www.bilibili.com/video/BV1ajEF6TEXE?t=9.0'
  }
];

export const CV_DATA: CVSection[] = [
  {
    titleZh: '教育背景',
    titleEn: 'Education',
    items: [
      {
        period: '2023 - 2025',
        organizationZh: '皇家艺术学院 (RCA) // 英国伦敦',
        organizationEn: 'Royal College of Art // London, UK',
        roleZh: '设计工程硕士 (MA/MSc Design Products)',
        roleEn: 'MA/MSc Design Products (Distinction Graduate)',
        detailsZh: [
          '主修研究方向：物质触觉界面、实体化数字交互以及后极简家具美学。',
          '毕业作品《Tactile Dial》获得皇家设计名录（RCA Show）全场前沿工艺推荐奖。'
        ],
        detailsEn: [
          'Focus areas: Tactile Physical Interfaces, Physicalized Web Systems, and Post-minimal furniture craftsmanship.',
          'Graduation project "Tactile Dial" was featured in the RCA Show under vanguard craftsmanship.'
        ]
      },
      {
        period: '2019 - 2023',
        organizationZh: '清华大学美术学院 // 北京',
        organizationEn: 'Academy of Fine Arts, Tsinghua University // Beijing, China',
        roleZh: '工业设计学士 (BFA Industrial Design)',
        roleEn: 'BFA Industrial Design (Honors Graduate)'
      }
    ]
  },
  {
    titleZh: '专业参展与荣誉',
    titleEn: 'Exhibitions & Certifications',
    items: [
      {
        period: '2025.04',
        organizationZh: '米兰设计周 SaloneSatellite // 意大利米兰',
        organizationEn: 'Milan Design Week (SaloneSatellite) // Milan, Italy',
        roleZh: '联合新锐设计师展陈',
        roleEn: 'Co-exhibitor representing Emerging Talents',
        detailsZh: ['携《器鸣》系列陶瓷扩音器组件与极简混凝土陈设木作参展。'],
        detailsEn: ['Presented "Vessel Whispers" passive amplifier models and custom concrete tabletop components.']
      },
      {
        period: '2024.09',
        organizationZh: '伦敦设计节 (LDF - London Design Festival) // 英国伦敦',
        organizationEn: 'London Design Festival // London, UK',
        roleZh: '“物与非物”装置群展成员',
        roleEn: 'Exhibiting Artist for "Material & immaterial"'
      },
      {
        period: '2023',
        organizationZh: '红点概念设计奖 (Red Dot Concept Design Award)',
        organizationEn: 'Red Dot Concept Design Award',
        roleZh: '至尊奖 (Best of the Best)',
        roleEn: 'Winner - Best of the Best in Furniture Concepts'
      }
    ]
  },
  {
    titleZh: '实践履历',
    titleEn: 'Professional Practices',
    items: [
      {
        period: '2025.08 - 至今',
        organizationZh: 'Concretely Design Studio // 英国伦敦',
        organizationEn: 'Concretely Design Studio // London, UK',
        roleZh: '高级工业与交互设计美学顾问',
        roleEn: 'Senior Physicalist & Industrial Designer',
        detailsZh: [
          '负责高奢电子数码科技配件在实体触感和界面交互上的融合设计。',
          '为知名瑞典家居品牌提供了面向2027的水性生物基低碳家具研发创意和触觉方案。'
        ],
        detailsEn: [
          'Leading organic integration between premium physical housing materials and dynamic embedded software tactile animations.',
          'Consulted Swedish lifestyle home decor systems on sustainable binder-free plywood molded furniture designs for 2027.'
        ]
      }
    ]
  }
];
