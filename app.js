(function () {
  "use strict";

  const mapElement = document.getElementById("jobMap");
  const mapMessage = document.getElementById("mapMessage");
  const form = document.getElementById("scanForm");
  const townInput = document.getElementById("townInput");
  const stateInput = document.getElementById("stateInput");
  const roleInput = document.getElementById("roleInput");
  const experienceInput = document.getElementById("experienceInput");
  const qualChipsEl = document.getElementById("qualChips");
  const qualInput = document.getElementById("qualInput");
  const radiusInput = document.getElementById("radiusInput");
  const radiusValue = document.getElementById("radiusValue");
  const entryFriendlyInput = document.getElementById("entryFriendlyInput");
  const highRatedInput = document.getElementById("highRatedInput");
  const closeOnlyInput = document.getElementById("closeOnlyInput");
  const resultFilter = document.getElementById("resultFilter");
  const scanButton = document.getElementById("scanButton");
  const statusText = document.getElementById("statusText");
  const statusCount = document.getElementById("statusCount");
  const progressFill = document.getElementById("progressFill");
  const resultsList = document.getElementById("resultsList");
  const matchStats = document.getElementById("matchStats");
  const mapEyebrow = document.getElementById("mapEyebrow");
  const mapTitle = document.getElementById("mapTitle");
  const selectedSummary = document.getElementById("selectedSummary");

  const skillAliases = [
    ["customer service", "customer service", "guest service", "client service", "people skills", "front desk"],
    ["cash handling", "cash", "cashier", "register", "payments", "till"],
    ["pos", "pos", "point of sale", "toast", "square"],
    ["sales", "sales", "upsell", "retail sales", "closing"],
    ["food safety", "food safety", "servsafe", "food handler", "kitchen safety"],
    ["serving", "server", "serving", "waiter", "waitress", "tables"],
    ["barista", "barista", "coffee", "espresso"],
    ["bilingual", "bilingual", "spanish", "mandarin", "french", "language"],
    ["excel", "excel", "spreadsheet", "sheets", "data entry"],
    ["administration", "admin", "administrative", "scheduling", "office"],
    ["inventory", "inventory", "stocking", "merchandising", "cycle count"],
    ["warehouse", "warehouse", "fulfillment", "picking", "packing", "shipping"],
    ["forklift", "forklift", "pallet jack", "osha"],
    ["driving", "driver", "driving", "delivery", "clean driving"],
    ["healthcare", "healthcare", "clinic", "patient", "medical"],
    ["cpr", "cpr", "first aid", "bls"],
    ["childcare", "childcare", "child care", "kids", "teaching assistant"],
    ["security", "security", "guard", "surveillance", "de-escalation"],
    ["maintenance", "maintenance", "repair", "hvac", "electrical", "plumbing"],
    ["construction", "construction", "carpentry", "site safety", "tools"],
    ["manufacturing", "manufacturing", "assembly", "quality control", "machine"],
    ["technical support", "tech support", "help desk", "troubleshooting", "ticketing"],
    ["javascript", "javascript", "js", "react", "node", "frontend"],
    ["data analysis", "data", "analytics", "sql", "python", "tableau"],
    ["marketing", "marketing", "social media", "content", "campaigns"],
    ["management", "manager", "management", "supervisor", "lead", "training"],
    ["cleaning", "cleaning", "janitorial", "housekeeping", "sanitation"]
  ];

  const businessProfiles = [
    {
      id: "restaurant",
      label: "Restaurant",
      matchTerms: ["server", "restaurant", "food", "barista", "host", "cook", "pos", "cash"],
      osmAmenity: ["restaurant", "cafe", "bar", "bakery", "fast_food", "pub", "food_court", "ice_cream", "biergarten"],
      roles: [
        { title: "Server", tags: ["customer service", "serving", "pos", "cash handling", "food safety"], years: 0 },
        { title: "Host", tags: ["customer service", "pos", "bilingual"], years: 0 },
        { title: "Barista", tags: ["customer service", "barista", "cash handling", "pos"], years: 0 },
        { title: "Line Cook", tags: ["food safety", "inventory", "cleaning"], years: 1 }
      ]
    },
    {
      id: "retail",
      label: "Retail",
      matchTerms: ["retail", "cashier", "sales", "store", "inventory", "stock", "customer"],
      osmShop: ["clothes", "supermarket", "convenience", "department_store", "electronics", "hardware", "shoes", "books", "mall", "general", "variety_store", "grocery", "florist", "furniture", "sports", "toys", "pet"],
      roles: [
        { title: "Retail Associate", tags: ["customer service", "sales", "cash handling", "inventory"], years: 0 },
        { title: "Cashier", tags: ["customer service", "cash handling", "pos"], years: 0 },
        { title: "Stock Associate", tags: ["inventory", "warehouse", "cleaning"], years: 0 },
        { title: "Store Lead", tags: ["management", "sales", "inventory", "management"], years: 2 }
      ]
    },
    {
      id: "logistics",
      label: "Logistics",
      matchTerms: ["warehouse", "logistics", "forklift", "driver", "delivery", "shipping", "packing"],
      osmAmenity: ["post_office"],
      osmShop: ["storage", "car_repair"],
      osmOffice: ["logistics"],
      roles: [
        { title: "Warehouse Associate", tags: ["warehouse", "inventory", "packing"], years: 0 },
        { title: "Delivery Driver", tags: ["driving", "customer service", "inventory"], years: 1 },
        { title: "Forklift Operator", tags: ["forklift", "warehouse", "inventory"], years: 1 }
      ]
    },
    {
      id: "healthcare",
      label: "Healthcare",
      matchTerms: ["medical", "healthcare", "patient", "clinic", "dental", "cpr", "care"],
      osmAmenity: ["doctors", "dentist", "hospital", "pharmacy", "clinic", "veterinary"],
      osmOffice: ["healthcare"],
      roles: [
        { title: "Medical Receptionist", tags: ["healthcare", "customer service", "administration", "scheduling"], years: 1 },
        { title: "Care Assistant", tags: ["healthcare", "cpr", "customer service", "cleaning"], years: 0 },
        { title: "Dental Assistant", tags: ["healthcare", "customer service", "bilingual"], years: 1 }
      ]
    },
    {
      id: "office",
      label: "Office",
      matchTerms: ["office", "admin", "administrative", "excel", "data", "scheduling", "reception"],
      osmOffice: ["financial", "insurance", "lawyer", "accountant", "real_estate", "company", "ngo", "educational_institution"],
      osmAmenity: ["bank", "government"],
      roles: [
        { title: "Administrative Assistant", tags: ["administration", "excel", "customer service", "scheduling"], years: 1 },
        { title: "Receptionist", tags: ["customer service", "administration", "scheduling", "bilingual"], years: 0 },
        { title: "Data Entry Specialist", tags: ["excel", "data analysis", "administration"], years: 0 }
      ]
    },
    {
      id: "tech",
      label: "Technology",
      matchTerms: ["tech", "technical support", "help desk", "software", "javascript", "data", "troubleshooting"],
      osmOffice: ["it"],
      osmShop: ["computer"],
      roles: [
        { title: "Technical Support Specialist", tags: ["technical support", "customer service", "troubleshooting"], years: 1 },
        { title: "Junior Web Developer", tags: ["javascript", "technical support", "data analysis"], years: 1 },
        { title: "Data Analyst Assistant", tags: ["data analysis", "excel", "administration"], years: 1 }
      ]
    },
    {
      id: "trades",
      label: "Trades",
      matchTerms: ["maintenance", "construction", "repair", "tools", "hvac", "electric", "plumbing"],
      osmCraft: ["carpenter", "electrician", "plumber", "hvac", "painter", "roofer", "metal_construction", "mechanic"],
      osmAmenity: ["car_repair"],
      roles: [
        { title: "Maintenance Technician", tags: ["maintenance", "repair", "customer service"], years: 1 },
        { title: "Construction Laborer", tags: ["construction", "maintenance", "cleaning"], years: 0 },
        { title: "Service Apprentice", tags: ["maintenance", "customer service", "construction"], years: 0 }
      ]
    },
    {
      id: "community",
      label: "Community",
      matchTerms: ["childcare", "security", "cleaning", "school", "events", "cpr"],
      osmAmenity: ["school", "kindergarten", "university", "college", "community_centre", "social_facility", "library", "gym", "cinema"],
      roles: [
        { title: "Childcare Assistant", tags: ["childcare", "cpr", "customer service"], years: 0 },
        { title: "Security Officer", tags: ["security", "customer service"], years: 0 },
        { title: "Event Staff", tags: ["customer service", "sales", "cleaning"], years: 0 }
      ]
    },
    {
      id: "hospitality",
      label: "Hospitality",
      matchTerms: ["hotel", "front desk", "housekeeping", "events", "hospitality", "customer"],
      osmTourism: ["hotel", "motel", "hostel", "guest_house"],
      osmAmenity: ["events_venue"],
      roles: [
        { title: "Front Desk Associate", tags: ["customer service", "administration", "bilingual"], years: 0 },
        { title: "Housekeeping Associate", tags: ["cleaning", "customer service"], years: 0 },
        { title: "Event Staff", tags: ["customer service", "sales", "cleaning"], years: 0 }
      ]
    }
  ];

  const interviewQuestions = {
    "Restaurant": ["Tell me about a busy shift — how did you keep up?", "How do you handle a guest who's unhappy with their order?", "What POS systems have you used?", "Are you okay with nights, weekends, and holidays?", "How do you work as a team during a rush?"],
    "Retail": ["How would you handle a return outside store policy?", "Describe a time you went above and beyond for a customer.", "How do you stay organized when the floor is busy?", "Have you met sales targets before?", "What would you do if you noticed shoplifting?"],
    "Logistics": ["Describe your warehouse or shipping experience.", "How do you stay safe handling heavy loads?", "Have you worked under tight deadlines?", "Are you comfortable with early morning or overnight shifts?", "How do you track and count inventory?"],
    "Healthcare": ["How do you keep patient information confidential?", "Describe a time you calmed a stressed patient.", "What scheduling or records software have you used?", "How do you prioritize when multiple people need help?", "Are you CPR certified or working toward it?"],
    "Office": ["What software are you most comfortable with?", "How do you manage competing deadlines?", "Describe a time you handled a difficult call or email.", "How do you stay organized with scheduling?", "Have you handled confidential business information?"],
    "Technology": ["Walk me through troubleshooting a PC that won't connect to the internet.", "How do you explain a tech issue to a non-technical person?", "What ticketing systems have you used?", "Describe a problem you solved that you hadn't seen before.", "How quickly do you pick up new software?"],
    "Trades": ["What tools or equipment are you certified to operate?", "How do you follow safety protocols on a job site?", "Describe a repair or project you're proud of.", "Are you comfortable working outdoors or in tight spaces?", "How do you handle scope changes mid-job?"],
    "Community": ["Why do you want to work in a community or service role?", "How do you handle someone who is upset or in distress?", "Describe experience with kids, elderly, or vulnerable groups.", "How do you de-escalate a tense situation?", "Are you comfortable with background checks?"],
    "Hospitality": ["How do you make a guest feel welcome from the first second?", "Describe experience with reservations, check-ins, or events.", "How do you handle an unhappy guest at check-in?", "Are you comfortable with evenings, weekends, and holidays?", "What does great hospitality mean to you?"]
  };

  const dressCodes = {
    "Restaurant": "Wear: dark jeans or khakis, closed-toe shoes. Ask about uniform when you arrive.",
    "Retail": "Wear: neat shirt, khakis or clean jeans (no holes), comfortable shoes.",
    "Logistics": "Wear: jeans, work boots, t-shirt is fine. High-vis if you have one.",
    "Healthcare": "Wear: scrubs if you have them, or neat business casual. Clean shoes.",
    "Office": "Wear: business casual — button shirt, slacks. Err on the professional side.",
    "Technology": "Wear: business casual — clean jeans or slacks, collared shirt.",
    "Trades": "Wear: work clothes, sturdy boots. Bring any certifications you have.",
    "Community": "Wear: neat casual — clean jeans or khakis, collared shirt.",
    "Hospitality": "Wear: business casual minimum; some hotels expect formal. Call ahead."
  };

  const applyMethod = {
    "Restaurant": { method: "walk-in", label: "Walk in" },
    "Retail": { method: "walk-in", label: "Walk in or online" },
    "Logistics": { method: "online", label: "Apply online" },
    "Healthcare": { method: "online", label: "Apply online" },
    "Office": { method: "online", label: "Apply online" },
    "Technology": { method: "online", label: "Apply online" },
    "Trades": { method: "walk-in", label: "Walk in or call" },
    "Community": { method: "online", label: "Apply online" },
    "Hospitality": { method: "walk-in", label: "Walk in" }
  };

  const categoryIcons = {
    "Restaurant": "🍽️", "Retail": "🛍️", "Logistics": "📦",
    "Healthcare": "🏥", "Office": "💼", "Technology": "💻",
    "Trades": "🔧", "Community": "🤝", "Hospitality": "🏨"
  };

  const scanMessages = [
    "Waking up the local job market...",
    "Talking to OpenStreetMap...",
    "Scouting every block in range...",
    "Matching skills to businesses...",
    "Ranking your best fits...",
    "Crunching the numbers...",
    "Almost ready for you..."
  ];

  const state = {
    businesses: [],
    selectedId: null,
    map: null,
    circle: null,
    markers: new Map(),
    location: null,
    radius: Number(radiusInput.value),
    saved: new Set(JSON.parse(localStorage.getItem("jobscout-saved") || "[]")),
    statuses: JSON.parse(localStorage.getItem("jobscout-statuses") || "{}"),
    hidden: new Set(JSON.parse(localStorage.getItem("jobscout-hidden") || "[]")),
    notes: JSON.parse(localStorage.getItem("jobscout-notes") || "{}"),
    lastScanTime: null
  };

  let qualChips = [
    { skill: "customer service", level: 1 },
    { skill: "pos", level: 1 },
    { skill: "cash handling", level: 1 },
    { skill: "bilingual", level: 1 },
    { skill: "food safety", level: 1 },
    { skill: "serving", level: 2 }
  ];

  const DEFAULT_MAP_CENTER = { lat: 39.8283, lng: -98.5795 };

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    runScan();
  });

  radiusInput.addEventListener("input", function () {
    radiusValue.textContent = radiusInput.value + " mi";
  });

  resultFilter.addEventListener("change", renderResults);

  document.getElementById("exportCsv").addEventListener("click", exportCsv);

  document.getElementById("themeToggle").addEventListener("click", toggleTheme);

  (function initTheme() {
    const saved = localStorage.getItem("jobscout-theme");
    if (saved === "dark") document.documentElement.dataset.theme = "dark";
  })();

  document.getElementById("resetLocation").addEventListener("click", function () {
    townInput.value = "Austin";
    stateInput.value = "TX";
    updateLocationLabels("Austin, TX");
  });

  document.getElementById("qualAdd").addEventListener("click", function () {
    addQualChip(qualInput.value);
    qualInput.value = "";
  });

  qualInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addQualChip(qualInput.value);
      qualInput.value = "";
    }
  });

  document.getElementById("recenterMap").addEventListener("click", function () {
    if (state.map && state.location) {
      state.map.setView(
        [state.location.center.lat, state.location.center.lng],
        zoomForRadius(state.radius)
      );
    }
  });

  resultsList.addEventListener("click", handleResultClick);
  resultsList.addEventListener("change", handleResultChange);
  resultsList.addEventListener("input", handleResultInput);

  initializeEmptyState();
  setupMobileTabs();
  renderQualChips();

  async function runScan() {
    if (!form.reportValidity()) return;

    const preferences = getPreferences();
    const radius = Number(radiusInput.value);
    const address = getRequiredAddress();

    state.radius = radius;
    state.selectedId = null;
    updateLocationLabels(address.label);
    setScanning(true);
    updateProgress(10, "Finding location...", "0 found");
    clearBusinesses();
    showSkeletonCards();

    try {
      updateProgress(18, "Geocoding address...", "0 found");
      const center = await geocodeAddress(address);
      state.location = { label: address.label, center: center, town: address.town, stateCode: address.stateCode };
      ensureMap(center, radius);

      updateProgress(38, "Scanning nearby businesses...", "0 found");
      const elements = await fetchOverpassBusinesses(center, radius);

      updateProgress(72, "Scoring matches...", elements.length + " employers found");

      const seen = new Set();
      const businesses = [];
      for (let i = 0; i < elements.length; i++) {
        const place = normalizeOsmElement(elements[i]);
        if (!place) continue;
        const key = place.name.toLowerCase() + "|" +
          Math.round(place.latLng.lat * 500) + "|" +
          Math.round(place.latLng.lng * 500);
        if (seen.has(key)) continue;
        seen.add(key);
        const biz = buildBusinessFromPlace(place, center, radius, preferences);
        if (biz) businesses.push(biz);
      }

      state.businesses = sortBusinesses(businesses).slice(0, 200);
      state.lastScanTime = Date.now();
      renderMapMarkers();
      renderResults();
      renderSkillGapBanner();
      setScanning(false);
      updateProgress(100, "Scan complete — " + state.businesses.length + " businesses found", state.businesses.filter(function(b){return b.score>=66;}).length + " strong fits");

      if (state.businesses.length) {
        selectBusiness(state.businesses[0].id, false);
        switchToTab("results-panel");
      } else {
        selectedSummary.textContent = "No businesses found — try a larger radius";
        switchToTab("results-panel");
      }
    } catch (error) {
      console.error("[JobScout] Scan error:", error);
      setScanning(false);
      clearBusinesses();
      const msg = error.message || "Scan failed — open browser console (F12) for details";
      setMapMessage(msg);
      updateProgress(0, msg, "0 found");
    }
  }

  function setupMobileTabs() {
    const tabs = document.querySelectorAll(".tab-btn");
    if (!tabs.length) return;

    // Set initial active panel
    activatePanel("search-panel");

    tabs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        tabs.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        activatePanel(btn.dataset.panel);
      });
    });
  }

  function activatePanel(panelClass) {
    document.querySelectorAll(".search-panel, .map-panel, .results-panel").forEach(function (el) {
      el.classList.remove("tab-active");
    });
    var panel = document.querySelector("." + panelClass);
    if (panel) panel.classList.add("tab-active");

    if (panelClass === "map-panel" && state.map) {
      setTimeout(function () { state.map.invalidateSize(); }, 120);
    }
  }

  function switchToTab(panelClass) {
    var isMobile = window.innerWidth <= 780;
    if (!isMobile) return;
    document.querySelectorAll(".tab-btn").forEach(function (b) {
      b.classList.toggle("active", b.dataset.panel === panelClass);
    });
    activatePanel(panelClass);
  }

  function initializeEmptyState() {
    updateLocationLabels("Austin, TX");
    setMapMessage("Enter location and click Run Scan");
    updateProgress(0, "Ready to scan nearby employers", "0 found");
    renderResults();
  }

  let scanMsgInterval = null;

  function setScanning(value) {
    scanButton.disabled = value;
    scanButton.textContent = value ? "Scanning..." : "Run Scan";
    document.body.classList.toggle("scanning", value);
    if (value) {
      let msgIdx = 0;
      scanMsgInterval = setInterval(function () {
        msgIdx = (msgIdx + 1) % scanMessages.length;
        statusText.textContent = scanMessages[msgIdx];
      }, 1400);
    } else {
      if (scanMsgInterval) { clearInterval(scanMsgInterval); scanMsgInterval = null; }
    }
  }

  function showSkeletonCards() {
    resultsList.innerHTML = Array(4).fill(null).map(function () {
      return '<div class="skeleton-card">' +
        '<div class="skel skel-title"></div>' +
        '<div class="skel skel-sub"></div>' +
        '<div class="skel skel-tags"></div>' +
        '</div>';
    }).join('');
  }

  function updateProgress(percent, text, count) {
    progressFill.style.width = percent + "%";
    statusText.textContent = text;
    statusCount.textContent = count;
  }

  function getRequiredAddress() {
    const town = townInput.value.trim();
    const stateCode = stateInput.value.trim().toUpperCase();
    stateInput.value = stateCode;
    return {
      town: town,
      stateCode: stateCode,
      label: town + ", " + stateCode
    };
  }

  function updateLocationLabels(label) {
    mapEyebrow.textContent = label;
    mapTitle.textContent = radiusInput.value + " mile scan";
  }

  function getPreferences() {
    const skills = qualChips.map(function (c) { return c.skill; });
    const expertSkills = qualChips.filter(function (c) { return c.level >= 2; }).map(function (c) { return c.skill; });
    return {
      role: roleInput.value.trim(),
      years: Number(experienceInput.value),
      skills: skills,
      expertSkills: expertSkills,
      rawText: skills.join(" ").toLowerCase() + " " + roleInput.value.toLowerCase(),
      entryFriendly: entryFriendlyInput.checked,
      highRated: highRatedInput.checked,
      closeOnly: closeOnlyInput.checked
    };
  }

  function parseQualifications(text) {
    const lower = " " + text.toLowerCase() + " ";
    const skills = [];
    skillAliases.forEach(function (group) {
      const canonical = group[0];
      const found = group.slice(1).some(function (term) {
        return lower.includes(term);
      });
      if (found && !skills.includes(canonical)) {
        skills.push(canonical);
      }
    });
    const yearsMatch = lower.match(/(\d+)\s*\+?\s*(years|year|yrs|yr)/);
    return {
      skills: skills,
      years: yearsMatch ? Number(yearsMatch[1]) : 0
    };
  }

  async function geocodeAddress(address) {
    const query = encodeURIComponent(
      address.town + ", " + address.stateCode + ", USA"
    );
    const url =
      "https://nominatim.openstreetmap.org/search?q=" +
      query +
      "&format=json&limit=1&countrycodes=us";

    const response = await fetch(url, {
      headers: { "Accept-Language": "en-US,en;q=0.9" }
    });

    if (!response.ok) {
      throw new Error("Geocoding service unavailable. Check your internet connection.");
    }

    const results = await response.json();
    if (!results.length) {
      throw new Error("Location not found. Check town and state spelling.");
    }

    return {
      lat: parseFloat(results[0].lat),
      lng: parseFloat(results[0].lon)
    };
  }

  async function fetchOverpassBusinesses(center, radiusMiles) {
    const meters = Math.round(milesToMeters(radiusMiles));
    const lat = center.lat;
    const lng = center.lng;

    const around = "around:" + meters + "," + lat + "," + lng;

    const query = [
      "[out:json][timeout:30];",
      "(",
      '  node["amenity"~"restaurant|cafe|bar|bakery|fast_food|pub|food_court|ice_cream|biergarten|doctors|dentist|hospital|pharmacy|clinic|veterinary|school|kindergarten|university|college|community_centre|social_facility|post_office|library|gym|cinema|bank|government|car_repair|events_venue"](' + around + ');',
      '  node["shop"~"clothes|supermarket|convenience|department_store|electronics|hardware|shoes|books|computer|mall|general|variety_store|grocery|florist|furniture|sports|toys|pet|garden_centre|car_repair|storage"](' + around + ');',
      '  node["office"~"yes|company|it|financial|insurance|lawyer|accountant|government|real_estate|healthcare|logistics|ngo|educational_institution"](' + around + ');',
      '  node["tourism"~"hotel|motel|hostel|guest_house"](' + around + ');',
      '  node["craft"~"carpenter|electrician|plumber|hvac|painter|roofer|metal_construction|mechanic|glaziery"](' + around + ');',
      '  way["amenity"~"restaurant|cafe|bar|bakery|fast_food|pub|school|hospital|clinic|pharmacy|gym|community_centre|cinema|bank"](' + around + ');',
      '  way["shop"~"clothes|supermarket|convenience|department_store|electronics|hardware|mall|grocery"](' + around + ');',
      '  way["tourism"~"hotel|motel|hostel"](' + around + ');',
      '  way["office"](' + around + ');',
      ');',
      'out center body;'
    ].join("\n");

    const endpoints = [
      "https://overpass-api.de/api/interpreter",
      "https://overpass.kumi.systems/api/interpreter"
    ];

    let lastError = null;
    for (let i = 0; i < endpoints.length; i++) {
      try {
        const response = await fetch(endpoints[i], {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: "data=" + encodeURIComponent(query)
        });
        if (!response.ok) throw new Error("HTTP " + response.status);
        const data = await response.json();
        return data.elements || [];
      } catch (err) {
        console.warn("[JobScout] Overpass endpoint failed:", endpoints[i], err.message);
        lastError = err;
      }
    }
    throw new Error("Business data unavailable right now. Check your internet connection and try again.");
  }

  function normalizeOsmElement(element) {
    const tags = element.tags || {};
    if (!tags.name) return null;

    const lat = element.type === "node"
      ? element.lat
      : (element.center && element.center.lat);
    const lng = element.type === "node"
      ? element.lon
      : (element.center && element.center.lon);

    if (!lat || !lng) return null;

    const types = [];
    if (tags.amenity) types.push(tags.amenity);
    if (tags.shop) types.push(tags.shop);
    if (tags.office) types.push(tags.office);
    if (tags.tourism) types.push(tags.tourism);
    if (tags.craft) types.push(tags.craft);

    const addrParts = [];
    if (tags["addr:housenumber"] && tags["addr:street"]) {
      addrParts.push(tags["addr:housenumber"] + " " + tags["addr:street"]);
    } else if (tags["addr:street"]) {
      addrParts.push(tags["addr:street"]);
    }
    if (tags["addr:city"]) addrParts.push(tags["addr:city"]);
    if (tags["addr:state"]) addrParts.push(tags["addr:state"]);
    if (tags["addr:postcode"]) addrParts.push(tags["addr:postcode"]);

    return {
      id: element.type + "/" + element.id,
      name: tags.name,
      address: addrParts.join(", ") || "Address unavailable",
      latLng: { lat: lat, lng: lng },
      types: types,
      rating: null,
      userRatingCount: 0,
      osmTags: tags
    };
  }

  function chooseProfileFromOsm(place, preferences) {
    const tags = place.osmTags || {};
    const amenity = tags.amenity || "";
    const shop = tags.shop || "";
    const office = tags.office || "";
    const tourism = tags.tourism || "";
    const craft = tags.craft || "";
    const name = (place.name || "").toLowerCase();

    const ranked = businessProfiles.map(function (profile) {
      let score = 0;

      // OSM tag matching
      if (profile.osmAmenity && profile.osmAmenity.includes(amenity)) score += 15;
      if (profile.osmShop && profile.osmShop.includes(shop)) score += 15;
      if (profile.osmOffice && profile.osmOffice.includes(office)) score += 15;
      if (profile.osmTourism && profile.osmTourism.includes(tourism)) score += 15;
      if (profile.osmCraft && profile.osmCraft.includes(craft)) score += 15;

      // Keyword matching against user preferences and place name
      profile.matchTerms.forEach(function (term) {
        if (preferences.rawText.includes(term) || name.includes(term)) score += 2;
      });

      // Skill overlap bonus
      profile.roles.forEach(function (role) {
        score += overlap(role.tags, preferences.skills);
      });

      return { profile: profile, score: score };
    }).sort(function (a, b) { return b.score - a.score; });

    return ranked[0] && ranked[0].score > 0 ? ranked[0].profile : businessProfiles[1];
  }

  function ensureMap(center, radius) {
    hideMapMessage();

    if (!state.map) {
      state.map = L.map(mapElement, {
        center: [center.lat, center.lng],
        zoom: zoomForRadius(radius),
        zoomControl: false,
        attributionControl: true
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(state.map);
    } else {
      state.map.setView([center.lat, center.lng], zoomForRadius(radius));
    }

    if (state.circle) {
      state.map.removeLayer(state.circle);
    }

    state.circle = L.circle([center.lat, center.lng], {
      radius: milesToMeters(radius),
      color: "#356f95",
      opacity: 0.55,
      weight: 2,
      fillColor: "#356f95",
      fillOpacity: 0.08
    }).addTo(state.map);
  }

  function buildMarkerIcon(business) {
    const color = business.grade === "high" ? "#287a5c"
      : business.grade === "mid" ? "#b87a18"
      : "#c04a3b";
    const isSelected = business.id === state.selectedId;
    const size = isSelected ? 28 : 22;
    const half = size / 2;
    const border = isSelected ? 4 : 2;
    const fontSize = isSelected ? 11 : 9;
    const label = Math.round(business.score / 10);

    return L.divIcon({
      className: "leaflet-job-marker",
      html: '<div style="' +
        'width:' + size + 'px;' +
        'height:' + size + 'px;' +
        'background:' + color + ';' +
        'border:' + border + 'px solid #fffefa;' +
        'border-radius:50%;' +
        'display:flex;' +
        'align-items:center;' +
        'justify-content:center;' +
        'color:#fff;' +
        'font-size:' + fontSize + 'px;' +
        'font-weight:800;' +
        'font-family:Inter,ui-sans-serif,sans-serif;' +
        'box-shadow:0 2px 8px rgba(0,0,0,0.28);' +
        'cursor:pointer;' +
        '">' + label + '</div>',
      iconSize: [size, size],
      iconAnchor: [half, half]
    });
  }

  function renderMapMarkers() {
    state.markers.forEach(function (marker) {
      state.map.removeLayer(marker);
    });
    state.markers.clear();

    state.businesses.forEach(function (business) {
      const icon = buildMarkerIcon(business);
      const marker = L.marker([business.lat, business.lng], { icon: icon });
      marker.addTo(state.map);
      marker.on("click", function () {
        selectBusiness(business.id, true);
      });
      state.markers.set(business.id, marker);
    });
  }

  function buildBusinessFromPlace(place, center, radius, preferences) {
    const lat = place.latLng.lat;
    const lng = place.latLng.lng;
    const distance = roundTo(distanceMiles(center, { lat: lat, lng: lng }), 1);
    if (distance > radius + 0.2) return null;

    const profile = chooseProfileFromOsm(place, preferences);
    const role = chooseRole(profile, preferences);
    const tags = role.tags.slice();
    const score = scoreBusiness(place, role, tags, distance, radius, preferences, profile);
    const matchedSkills = tags.filter(function (tag) {
      return preferences.skills.includes(tag);
    });

    return {
      id: place.id,
      business: place.name,
      role: preferences.role.trim() || role.title,
      category: profile.label,
      tags: tags,
      years: role.years,
      entry: role.years <= 1,
      distance: distance,
      rating: place.rating,
      userRatingsTotal: 0,
      address: place.address,
      lat: lat,
      lng: lng,
      placeTypes: place.types || [],
      score: score,
      grade: score >= 82 ? "high" : score >= 66 ? "mid" : "low",
      matchedSkills: matchedSkills,
      reason: buildReason(matchedSkills, distance, profile)
    };
  }

  function chooseRole(profile, preferences) {
    const target = preferences.role.toLowerCase();
    const ranked = profile.roles.map(function (role) {
      let score = overlap(role.tags, preferences.skills) * 4;
      if (target && role.title.toLowerCase().includes(target)) score += 12;
      role.tags.forEach(function (tag) {
        if (target && target.includes(tag)) score += 4;
      });
      if (preferences.entryFriendly && role.years <= 1) score += 3;
      if (preferences.years >= role.years) score += 3;
      return { role: role, score: score };
    }).sort(function (a, b) { return b.score - a.score; });

    return ranked[0].role;
  }

  function scoreBusiness(place, role, tags, distance, radius, preferences, profile) {
    const roleText = (role.title + " " + profile.label + " " + tags.join(" ")).toLowerCase();
    const target = preferences.role.toLowerCase();
    const matchedSkills = overlap(tags, preferences.skills);
    const expertBonus = overlap(tags, preferences.expertSkills || []) * 5;
    const roleScore = target ? fuzzyRoleScore(target, roleText) : 12;
    const skillScore = matchedSkills ? Math.min(34, matchedSkills * 10 + expertBonus) : 0;
    const experienceScore = Math.max(0, 16 - Math.max(0, role.years - preferences.years) * 7);
    const distanceScore = Math.max(0, Math.round(20 - (distance / radius) * 18));
    const ratingScore = 3;
    const entryScore = preferences.entryFriendly && role.years <= 1 ? 5 : 0;
    return clamp(
      Math.round(18 + roleScore + skillScore + experienceScore + distanceScore + ratingScore + entryScore),
      20,
      99
    );
  }

  function buildReason(matchedSkills, distance, profile) {
    const parts = [];
    if (matchedSkills.length) {
      parts.push("Matches " + matchedSkills.slice(0, 4).join(", "));
    } else {
      parts.push("Related " + profile.label.toLowerCase() + " business");
    }
    parts.push(distance + " mi away");
    return parts.join("; ");
  }

  function sortBusinesses(businesses) {
    const filtered = highRatedInput.checked
      ? businesses.filter(function (b) { return b.rating === null || b.rating >= 4.2; })
      : businesses;

    if (closeOnlyInput.checked) {
      return filtered.sort(function (a, b) {
        return a.distance - b.distance || b.score - a.score;
      });
    }

    return filtered.sort(function (a, b) {
      return b.score - a.score || a.distance - b.distance;
    });
  }

  function renderResults() {
    const visible = getFilteredBusinesses().filter(function (b) { return !state.hidden.has(b.id); });
    const roleFits = state.businesses.filter(function (b) { return b.score >= 66; }).length;
    const topScore = state.businesses[0] ? state.businesses[0].score : 0;
    const ts = state.lastScanTime
      ? "Scanned " + timeSince(state.lastScanTime)
      : "AI ranked matches";

    document.getElementById("resultEyebrow").textContent = ts;

    matchStats.innerHTML =
      "<div><strong>" + state.businesses.length + "</strong><span>Businesses</span></div>" +
      "<div><strong>" + roleFits + "</strong><span>Role fits</span></div>" +
      "<div><strong>" + topScore + "%</strong><span>Top match</span></div>";

    if (!visible.length) {
      const msgs = {
        saved: "No saved jobs yet — click the heart on any card.",
        hidden: "You hid all results. Try a new scan or different filters."
      };
      const msg = msgs[resultFilter.value] || "No businesses yet — run a scan.";
      resultsList.innerHTML = '<div class="empty-state">' +
        '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<circle cx="28" cy="26" r="16" stroke="currentColor" stroke-width="3"/>' +
        '<line x1="39.5" y1="37.5" x2="54" y2="52" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>' +
        '<circle cx="28" cy="26" r="6" fill="currentColor" opacity="0.2"/>' +
        '</svg>' +
        '<p>' + msg + '</p></div>';
      return;
    }

    const preferences = getPreferences();
    resultsList.innerHTML = visible.map(function (biz, i) {
      try {
        return buildCardHTML(biz, preferences, i);
      } catch (e) {
        console.error("[JobScout] Card render error for", biz.id, e);
        return '<article class="job-card low" data-id="' + biz.id + '"><div class="job-main"><div><h3>' + (biz.role || "Job") + '</h3><p>' + (biz.business || "") + '</p></div></div></article>';
      }
    }).join("");
  }

  function handleResultClick(event) {
    if (event.target.closest(".job-tag-btn")) {
      event.stopPropagation();
      addQualChip(event.target.closest(".job-tag-btn").dataset.skill);
      return;
    }
    if (event.target.closest(".save-btn")) {
      event.stopPropagation();
      toggleSave(event.target.closest(".save-btn").dataset.id);
      return;
    }
    if (event.target.closest(".hide-btn")) {
      event.stopPropagation();
      hideJob(event.target.closest(".hide-btn").dataset.id);
      return;
    }
    if (event.target.closest(".share-btn")) {
      event.stopPropagation();
      shareCard(event.target.closest(".share-btn").dataset.id);
      return;
    }
    if (event.target.closest(".prep-toggle")) {
      event.stopPropagation();
      const card = event.target.closest(".job-card");
      const prep = card.querySelector(".interview-prep");
      if (prep) {
        prep.hidden = !prep.hidden;
        event.target.closest(".prep-toggle").textContent = prep.hidden ? "Interview prep" : "Hide prep";
      }
      return;
    }
    if (event.target.closest(".notes-toggle")) {
      event.stopPropagation();
      const card = event.target.closest(".job-card");
      const notes = card.querySelector(".card-notes");
      if (notes) notes.hidden = !notes.hidden;
      return;
    }
    if (event.target.closest(".status-select") || event.target.closest(".note-field") || event.target.closest("a")) return;

    const card = event.target.closest(".job-card");
    if (card) selectBusiness(card.dataset.id, true);
  }

  function handleResultChange(event) {
    const sel = event.target.closest(".status-select");
    if (sel) { event.stopPropagation(); setJobStatus(sel.dataset.id, sel.value); }
  }

  function handleResultInput(event) {
    const field = event.target.closest(".note-field");
    if (field) saveNote(field.dataset.id, field.value);
  }

  function buildCardHTML(biz, preferences, index) {
    const active = biz.id === state.selectedId ? " active" : "";
    const level = biz.grade === "high" ? "" : " " + biz.grade;
    const staggerDelay = Math.min((index || 0) * 38, 600);
    const isSaved = state.saved.has(biz.id);
    const status = state.statuses[biz.id] || "";
    const note = state.notes[biz.id] || "";

    const loc = state.location
      ? encodeURIComponent(state.location.town + ", " + state.location.stateCode)
      : encodeURIComponent("USA");
    const roleQ = encodeURIComponent(biz.role);
    const bizQ = encodeURIComponent(biz.business);

    const tags = biz.tags.slice(0, 6).map(function (tag) {
      const inQuals = qualChips.some(function (c) { return c.skill === tag; });
      return '<button class="job-tag-btn' + (inQuals ? " in-quals" : "") + '" data-skill="' + escapeHTML(tag) + '" type="button">' + escapeHTML(tag) + (inQuals ? " ✓" : "") + "</button>";
    }).join("");

    const statusBadge = status
      ? '<span class="status-badge status-' + status + '">' + { applied: "Applied", heard: "Heard back", interview: "Interview!" }[status] + "</span>"
      : "";

    const applyInfo = applyMethod[biz.category] || { method: "walk-in", label: "Walk in" };
    const applyBadge = '<span class="apply-badge ' + applyInfo.method + '">' + applyInfo.label + "</span>";

    const statusSelect = isSaved
      ? '<select class="status-select" data-id="' + escapeHTML(biz.id) + '">' +
          '<option value="">Track status...</option>' +
          ['applied','heard','interview'].map(function(v){ return '<option value="' + v + '"' + (status===v?" selected":"") + '>' + {applied:"Applied",heard:"Heard back",interview:"Interview!"}[v] + "</option>"; }).join("") +
        "</select>"
      : "";

    // "Why not" for low-grade cards
    const missing = biz.grade === "low"
      ? biz.tags.filter(function (t) { return !preferences.skills.includes(t); }).slice(0, 3)
      : [];
    const whyNot = missing.length
      ? '<p class="why-not">Gap: this role often wants ' + missing.map(function (t) { return "<em>" + escapeHTML(t) + "</em>"; }).join(", ") + ".</p>"
      : "";

    // Confidence coach
    const coach = biz.matchedSkills && biz.matchedSkills.length
      ? '<p class="confidence-pitch">Say: <em>"I have ' +
          biz.matchedSkills.slice(0, 3).map(escapeHTML).join(", ") +
          (preferences.years > 0 ? ", and " + preferences.years + " year" + (preferences.years > 1 ? "s" : "") + " of experience" : "") +
          '."</em></p>'
      : "";

    // Interview prep section (hidden by default)
    const questions = interviewQuestions[biz.category] || interviewQuestions["Restaurant"];
    const dressLine = dressCodes[biz.category] || "";
    const interviewSection =
      '<div class="interview-prep" hidden>' +
        '<p class="prep-title">Likely questions for ' + escapeHTML(biz.category) + ':</p>' +
        '<ol>' + questions.map(function (q) { return "<li>" + escapeHTML(q) + "</li>"; }).join("") + "</ol>" +
        (dressLine ? '<p class="dress-hint">' + escapeHTML(dressLine) + "</p>" : "") +
      "</div>";

    const notesSection =
      '<div class="card-notes"' + (note ? "" : " hidden") + ">" +
        '<textarea class="note-field" data-id="' + escapeHTML(biz.id) + '" placeholder="Contact name, interview date, follow-up notes...">' + escapeHTML(note) + "</textarea>" +
      "</div>";

    const icon = categoryIcons[biz.category] || "📍";

    return (
      '<article class="job-card' + level + active + (isSaved ? " saved" : "") + '" data-id="' + escapeHTML(biz.id) + '" tabindex="0" role="button" style="--card-i:' + staggerDelay + 'ms">' +
        '<div class="job-main">' +
          "<div>" +
            '<h3><span class="card-icon">' + icon + '</span>' + escapeHTML(biz.role) + "</h3>" +
            "<p>" + escapeHTML(biz.business) + " · " + escapeHTML(biz.address) + "</p>" +
          "</div>" +
          '<div class="card-actions">' +
            '<button class="save-btn' + (isSaved ? " saved" : "") + '" data-id="' + escapeHTML(biz.id) + '" title="' + (isSaved ? "Unsave" : "Save") + '" type="button">' + (isSaved ? "♥" : "♡") + "</button>" +
            '<button class="hide-btn" data-id="' + escapeHTML(biz.id) + '" title="Not interested" type="button">✕</button>' +
            '<span class="score-pill ' + biz.grade + '">' + biz.score + "%</span>" +
          "</div>" +
        "</div>" +
        '<div class="job-meta">' +
          "<span>" + escapeHTML(biz.distance + " mi") + "</span>" +
          "<span>" + escapeHTML(biz.category) + "</span>" +
          applyBadge + statusBadge +
        "</div>" +
        '<p class="job-reason">' + escapeHTML(biz.reason) + "</p>" +
        '<div class="match-bar"><div class="match-bar-fill" style="width:' + biz.score + '%"></div></div>' +
        coach + whyNot +
        '<div class="job-tags">' + tags + "</div>" +
        '<div class="job-links">' +
          '<a href="https://www.indeed.com/jobs?q=' + roleQ + '&l=' + loc + '" target="_blank" rel="noopener noreferrer" class="job-link indeed">Indeed</a>' +
          '<a href="https://www.linkedin.com/jobs/search/?keywords=' + roleQ + '&location=' + loc + '" target="_blank" rel="noopener noreferrer" class="job-link linkedin">LinkedIn</a>' +
          '<a href="https://www.glassdoor.com/Job/jobs.htm?sc.keyword=' + roleQ + '&locT=N&locName=' + loc + '" target="_blank" rel="noopener noreferrer" class="job-link glassdoor">Glassdoor</a>' +
          '<a href="https://www.ziprecruiter.com/jobs-search?search=' + roleQ + '&location=' + loc + '" target="_blank" rel="noopener noreferrer" class="job-link zipr">ZipRecruiter</a>' +
          '<a href="https://www.craigslist.org/search/ggg?query=' + roleQ + '" target="_blank" rel="noopener noreferrer" class="job-link craigslist">Craigslist</a>' +
          '<a href="https://www.google.com/search?q=' + bizQ + '+jobs+hiring" target="_blank" rel="noopener noreferrer" class="job-link web">Web</a>' +
          '<a href="https://www.google.com/maps/dir/?api=1&destination=' + biz.lat + "," + biz.lng + '" target="_blank" rel="noopener noreferrer" class="job-link maps">Directions</a>' +
          '<button class="job-link share-btn" data-id="' + escapeHTML(biz.id) + '" type="button">Share</button>' +
          statusSelect +
        "</div>" +
        '<div class="card-extra">' +
          '<button class="toggle-btn prep-toggle" type="button">Interview prep</button>' +
          '<button class="toggle-btn notes-toggle" type="button">' + (note ? "Notes ✓" : "Add note") + "</button>" +
        "</div>" +
        interviewSection + notesSection +
      "</article>"
    );
  }

  function toggleSave(id) {
    if (state.saved.has(id)) {
      state.saved.delete(id);
    } else {
      state.saved.add(id);
    }
    localStorage.setItem("jobscout-saved", JSON.stringify([...state.saved]));
    renderResults();
  }

  function setJobStatus(id, status) {
    if (status) {
      state.statuses[id] = status;
    } else {
      delete state.statuses[id];
    }
    localStorage.setItem("jobscout-statuses", JSON.stringify(state.statuses));
    renderResults();
  }

  function hideJob(id) {
    state.hidden.add(id);
    localStorage.setItem("jobscout-hidden", JSON.stringify([...state.hidden]));
    renderResults();
  }

  function saveNote(id, text) {
    if (text.trim()) {
      state.notes[id] = text;
    } else {
      delete state.notes[id];
    }
    localStorage.setItem("jobscout-notes", JSON.stringify(state.notes));
  }

  function shareCard(id) {
    const biz = state.businesses.find(function (b) { return b.id === id; });
    if (!biz) return;
    const text =
      biz.role + " at " + biz.business + "\n" +
      biz.address + "\n" +
      biz.distance + " mi away · " + biz.score + "% match\n" +
      "Skills needed: " + biz.tags.slice(0, 4).join(", ") + "\n" +
      "Found on JobScout Map";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function () {
        const btn = resultsList.querySelector('.share-btn[data-id="' + id + '"]');
        if (btn) { btn.textContent = "Copied!"; setTimeout(function () { btn.textContent = "Share"; }, 1800); }
      });
    }
  }

  function renderSkillGapBanner() {
    const banner = document.getElementById("skillGapBanner");
    if (!banner || !state.businesses.length) { if (banner) banner.hidden = true; return; }
    const freq = {};
    state.businesses.forEach(function (biz) {
      biz.tags.forEach(function (tag) {
        if (!qualChips.some(function (c) { return c.skill === tag; })) {
          freq[tag] = (freq[tag] || 0) + 1;
        }
      });
    });
    const gaps = Object.keys(freq)
      .filter(function (t) { return freq[t] >= 3; })
      .sort(function (a, b) { return freq[b] - freq[a]; })
      .slice(0, 4);
    if (!gaps.length) { banner.hidden = true; return; }
    banner.hidden = false;
    banner.innerHTML =
      '<span class="gap-label">In demand nearby:</span> ' +
      gaps.map(function (t) {
        return '<button class="gap-chip" data-skill="' + escapeHTML(t) + '" type="button">' +
          escapeHTML(t) + ' <em>' + freq[t] + ' jobs</em></button>';
      }).join("") +
      '<span class="gap-tip"> — click to add to your qualifications</span>';
    banner.querySelectorAll(".gap-chip").forEach(function (btn) {
      btn.addEventListener("click", function () { addQualChip(btn.dataset.skill); });
    });
  }

  function timeSince(ts) {
    const s = Math.floor((Date.now() - ts) / 1000);
    if (s < 60) return "just now";
    if (s < 3600) return Math.floor(s / 60) + " min ago";
    return Math.floor(s / 3600) + " hr ago";
  }

  function toggleTheme() {
    const isDark = document.documentElement.dataset.theme === "dark";
    document.documentElement.dataset.theme = isDark ? "" : "dark";
    localStorage.setItem("jobscout-theme", isDark ? "" : "dark");
  }

  function exportCsv() {
    const businesses = getFilteredBusinesses();
    if (!businesses.length) return;
    const rows = [["Role", "Business", "Address", "Category", "Score", "Distance (mi)", "Skills", "Reason", "Status"]];
    businesses.forEach(function (b) {
      rows.push([
        b.role,
        b.business,
        b.address,
        b.category,
        b.score + "%",
        b.distance,
        b.tags.join("; "),
        b.reason,
        state.statuses[b.id] || ""
      ]);
    });
    const csv = rows.map(function (row) {
      return row.map(function (cell) {
        const str = String(cell).replace(/"/g, '""');
        return /[",\n]/.test(str) ? '"' + str + '"' : str;
      }).join(",");
    }).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "jobscout-results.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function renderQualChips() {
    qualChipsEl.innerHTML = qualChips.map(function (chip) {
      const isExpert = chip.level >= 2;
      return (
        '<span class="qual-chip' + (isExpert ? " expert" : "") + '" data-skill="' + escapeHTML(chip.skill) + '" title="' + (isExpert ? "Expert — click for basic" : "Basic — click for expert") + '">' +
          '<span class="qual-chip-label">' + escapeHTML(chip.skill) + (isExpert ? ' <em>★</em>' : '') + '</span>' +
          '<button class="qual-chip-remove" data-skill="' + escapeHTML(chip.skill) + '" type="button" aria-label="Remove ' + escapeHTML(chip.skill) + '">×</button>' +
        '</span>'
      );
    }).join("");

    qualChipsEl.querySelectorAll(".qual-chip").forEach(function (el) {
      el.addEventListener("click", function (event) {
        if (event.target.closest(".qual-chip-remove")) return;
        toggleChipLevel(el.dataset.skill);
      });
    });

    qualChipsEl.querySelectorAll(".qual-chip-remove").forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        event.stopPropagation();
        removeQualChip(btn.dataset.skill);
      });
    });
  }

  function addQualChip(text) {
    const skill = canonicalizeSkill(text);
    if (!skill) return;
    if (qualChips.some(function (c) { return c.skill === skill; })) return;
    qualChips.push({ skill: skill, level: 1 });
    renderQualChips();
    if (state.businesses.length) rescoreAll();
  }

  function removeQualChip(skill) {
    qualChips = qualChips.filter(function (c) { return c.skill !== skill; });
    renderQualChips();
    if (state.businesses.length) rescoreAll();
  }

  function toggleChipLevel(skill) {
    qualChips = qualChips.map(function (c) {
      return c.skill === skill ? { skill: c.skill, level: c.level >= 2 ? 1 : 2 } : c;
    });
    renderQualChips();
    if (state.businesses.length) rescoreAll();
  }

  function canonicalizeSkill(text) {
    const lower = text.toLowerCase().trim();
    if (!lower) return null;
    for (var i = 0; i < skillAliases.length; i++) {
      var group = skillAliases[i];
      if (group.slice(1).some(function (alias) { return lower.includes(alias); })) {
        return group[0];
      }
    }
    return lower;
  }

  function rescoreAll() {
    if (!state.businesses.length) return;
    const preferences = getPreferences();
    state.businesses = state.businesses.map(function (biz) {
      const matchedSkills = biz.tags.filter(function (tag) {
        return preferences.skills.includes(tag);
      });
      const roleText = (biz.role + " " + biz.category + " " + biz.tags.join(" ")).toLowerCase();
      const target = preferences.role.toLowerCase();
      const matched = overlap(biz.tags, preferences.skills);
      const expertBonus = overlap(biz.tags, preferences.expertSkills || []) * 5;
      const roleScore = target ? fuzzyRoleScore(target, roleText) : 12;
      const skillScore = matched ? Math.min(34, matched * 10 + expertBonus) : 0;
      const experienceScore = Math.max(0, 16 - Math.max(0, biz.years - preferences.years) * 7);
      const distanceScore = Math.max(0, Math.round(20 - (biz.distance / state.radius) * 18));
      const entryScore = preferences.entryFriendly && biz.years <= 1 ? 5 : 0;
      const score = clamp(Math.round(18 + roleScore + skillScore + experienceScore + distanceScore + 3 + entryScore), 20, 99);
      return Object.assign({}, biz, {
        matchedSkills: matchedSkills,
        score: score,
        grade: score >= 82 ? "high" : score >= 66 ? "mid" : "low",
        reason: buildReason(matchedSkills, biz.distance, { label: biz.category })
      });
    });
    state.businesses = sortBusinesses(state.businesses);
    renderMapMarkers();
    renderResults();
  }

  function getFilteredBusinesses() {
    const filter = resultFilter.value;
    const base = state.businesses.filter(function (b) { return !state.hidden.has(b.id); });
    if (filter === "strong") return base.filter(function (b) { return b.score >= 82; });
    if (filter === "entry") return base.filter(function (b) { return b.entry; });
    if (filter === "rated") return base.filter(function (b) { return b.rating === null || b.rating >= 4.2; });
    if (filter === "saved") return base.filter(function (b) { return state.saved.has(b.id); });
    return base;
  }

  function selectBusiness(id, focusMap) {
    const prevId = state.selectedId;
    state.selectedId = id;
    const business = state.businesses.find(function (item) { return item.id === id; });

    // Update previously selected marker
    if (prevId && prevId !== id) {
      const prevBiz = state.businesses.find(function (b) { return b.id === prevId; });
      const prevMarker = state.markers.get(prevId);
      if (prevBiz && prevMarker) prevMarker.setIcon(buildMarkerIcon(prevBiz));
    }

    if (!business) {
      selectedSummary.textContent = "Click a marker or result";
      renderResults();
      return;
    }

    // Update selected marker
    const marker = state.markers.get(business.id);
    if (marker) {
      marker.setIcon(buildMarkerIcon(business));
      marker.bindPopup(
        "<strong>" + escapeHTML(business.business) + "</strong><br>" +
        escapeHTML(business.role) + " fit<br>" +
        escapeHTML(business.distance + " mi away")
      ).openPopup();
    }

    selectedSummary.textContent =
      business.business + " / " + business.role + " / " + business.score + "% match";

    if (focusMap && state.map) {
      state.map.panTo([business.lat, business.lng]);
    }

    renderResults();
  }

  function clearBusinesses() {
    state.businesses = [];
    state.selectedId = null;
    selectedSummary.textContent = "Click a marker or result";
    if (state.map) {
      state.map.closePopup();
    }
    state.markers.forEach(function (marker) {
      if (state.map) state.map.removeLayer(marker);
    });
    state.markers.clear();
    renderResults();
  }

  function setMapMessage(message) {
    mapMessage.textContent = message;
    mapMessage.classList.remove("hidden");
  }

  function hideMapMessage() {
    mapMessage.classList.add("hidden");
  }

  function zoomForRadius(radius) {
    if (radius <= 3) return 13;
    if (radius <= 8) return 12;
    if (radius <= 15) return 11;
    return 10;
  }

  function milesToMeters(miles) {
    return miles * 1609.344;
  }

  function distanceMiles(a, b) {
    const earthMiles = 3958.8;
    const dLat = degreesToRadians(b.lat - a.lat);
    const dLng = degreesToRadians(b.lng - a.lng);
    const lat1 = degreesToRadians(a.lat);
    const lat2 = degreesToRadians(b.lat);
    const v =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return earthMiles * 2 * Math.atan2(Math.sqrt(v), Math.sqrt(1 - v));
  }

  function degreesToRadians(value) {
    return value * Math.PI / 180;
  }

  function overlap(a, b) {
    return a.filter(function (item) { return b.includes(item); }).length;
  }

  function fuzzyRoleScore(needle, text) {
    const words = needle.split(/\s+/).filter(Boolean);
    if (!words.length) return 8;
    const hits = words.filter(function (word) { return text.includes(word); }).length;
    return Math.round((hits / words.length) * 20);
  }

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function roundTo(value, precision) {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }
})();
