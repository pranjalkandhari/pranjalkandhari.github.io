const themeToggle = document.querySelector(".theme-toggle");

const applyTheme = (theme, persist = true) => {
    const nextTheme = theme === "light" ? "light" : "dark";
    const isLight = nextTheme === "light";

    document.documentElement.dataset.theme = nextTheme;
    themeToggle.setAttribute("aria-pressed", String(isLight));
    themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
    themeToggle.title = isLight ? "Switch to dark mode" : "Switch to light mode";

    if (persist) {
        try {
            localStorage.setItem("theme", nextTheme);
        } catch (error) {}
    }
};

applyTheme(document.documentElement.dataset.theme, false);

themeToggle.addEventListener("click", () => {
    applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

const panelOrder = ["research", "publications", "academic-experience", "engineering-experience", "projects", "education"];
const panelLabels = ["Research", "Publications", "Academic Experience", "Engineering Experience", "Projects", "Education"];
const sectionNav = document.querySelector(".section-nav");
const navLinks = Array.from(sectionNav.querySelectorAll(".nav-links a"));
const contentSections = Array.from(document.querySelectorAll("main > section:not(#about)"));
const previousButton = document.querySelector(".section-arrow-prev");
const nextButton = document.querySelector(".section-arrow-next");
const hero = document.querySelector("#about");
let activePanel = panelOrder.includes(window.location.hash.slice(1))
    ? window.location.hash.slice(1)
    : panelOrder[0];

const belongsToPanel = (section, panel) => {
    return section.id === panel || (panel === "education" && section.id === "skills");
};

const setActivePanel = (panel, options = {}) => {
    if (!panelOrder.includes(panel)) return;

    const { scroll = false, historyMode = "none" } = options;
    activePanel = panel;
    const activeIndex = panelOrder.indexOf(panel);

    contentSections.forEach((section) => {
        const isActive = belongsToPanel(section, panel);
        section.classList.toggle("is-active-panel", isActive);

        if (isActive) {
            section.querySelectorAll(".reveal-ready").forEach((element) => {
                element.classList.add("is-visible");
            });
        }
    });

    navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${panel}`;
        link.classList.toggle("active", isActive);
        link.setAttribute("aria-current", isActive ? "page" : "false");

        if (isActive) {
            const rail = link.parentElement;
            const left = link.offsetLeft - (rail.clientWidth - link.clientWidth) / 2;
            rail.scrollTo({ left, behavior: scroll ? "smooth" : "auto" });
        }
    });

    previousButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === panelOrder.length - 1;

    const previousLabel = panelLabels[activeIndex - 1];
    const nextLabel = panelLabels[activeIndex + 1];
    previousButton.setAttribute("aria-label", previousLabel ? `Previous section: ${previousLabel}` : "No previous section");
    previousButton.title = previousLabel ? `Previous: ${previousLabel}` : "First section";
    nextButton.setAttribute("aria-label", nextLabel ? `Next section: ${nextLabel}` : "No next section");
    nextButton.title = nextLabel ? `Next: ${nextLabel}` : "Last section";

    document.body.classList.add("has-section-tabs");

    if (historyMode === "push") {
        window.history.pushState(null, "", `#${panel}`);
    } else if (historyMode === "replace") {
        window.history.replaceState(null, "", `#${panel}`);
    }

    if (scroll) {
        requestAnimationFrame(() => {
            document.getElementById(panel).scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }

};

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        setActivePanel(link.getAttribute("href").slice(1), { scroll: true, historyMode: "push" });
    });
});

previousButton.addEventListener("click", () => {
    const previousPanel = panelOrder[panelOrder.indexOf(activePanel) - 1];
    if (previousPanel) setActivePanel(previousPanel, { scroll: true, historyMode: "push" });
});

nextButton.addEventListener("click", () => {
    const nextPanel = panelOrder[panelOrder.indexOf(activePanel) + 1];
    if (nextPanel) setActivePanel(nextPanel, { scroll: true, historyMode: "push" });
});

window.addEventListener("popstate", () => {
    const requestedPanel = window.location.hash.slice(1);
    setActivePanel(panelOrder.includes(requestedPanel) ? requestedPanel : panelOrder[0], { scroll: true });
});

const arrowVisibilityObserver = new IntersectionObserver(([entry]) => {
    const heroIsMostlyVisible = entry.intersectionRatio >= 0.35;
    document.body.classList.toggle("show-section-arrows", !heroIsMostlyVisible);
}, { threshold: [0, 0.35, 1] });

arrowVisibilityObserver.observe(hero);

setActivePanel(activePanel);

const revealTargets = document.querySelectorAll(
    ".research-item, .research-interests, .pub-item, .exp-item, .project-item, .edu-item, .skills-block, .award-item"
);

revealTargets.forEach((element) => element.classList.add("reveal-ready"));

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
    });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

revealTargets.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
    revealObserver.observe(element);
});


contentSections.filter((section) => section.classList.contains("is-active-panel")).forEach((section) => {
    section.querySelectorAll(".reveal-ready").forEach((element) => element.classList.add("is-visible"));
});
