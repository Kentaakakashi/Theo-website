import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Button, Glass } from "open-glass-ui";
import SwarmCanvas from "./components/SwarmCanvas";

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 15 15 5M6 5h9v9" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 3v13m-5-5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TheoMark() {
  return (
    <span className="theo-mark" aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

function scrollToExperience() {
  document.getElementById("experience")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function App() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.05,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 38 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      gsap.to(".hero-chrome", {
        yPercent: 17,
        rotate: 8,
        scale: 0.94,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".orbit-caption", {
        y: -28,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      context.revert();
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <SwarmCanvas />
      <div className="site-shell">
        <header className="header">
          <Glass as="nav" tone="dark" material="regular" className="nav-glass" aria-label="Main navigation">
            <a className="brand" href="#top" aria-label="Theo home">
              <TheoMark />
              <span>theo</span>
            </a>
            <div className="nav-links">
              <a href="#approach">Overview</a>
              <a href="#capabilities">Capabilities</a>
              <a href="#experience">The experience</a>
            </div>
            <Button variant="quiet" className="nav-button" onClick={scrollToExperience}>
              Meet Theo <ArrowUpRight />
            </Button>
          </Glass>
        </header>

        <main>
          <section className="hero" id="top" data-swarm-target="hero">
            <div className="hero-grain" />
            <div className="hero-copy">
              <div className="eyebrow hero-eyebrow">
                <span className="status-dot" />
                A PERSONAL AI, MADE TO MOVE WITH YOU
              </div>
              <h1 className="hero-title">
                More than
                <br />
                an <em>assistant.</em>
              </h1>
              <p className="hero-description">
                One intelligent companion for thinking clearly, exploring ideas, and moving the things that matter forward.
              </p>
              <div className="hero-actions">
                <a className="button-primary" href="#approach">
                  Discover Theo <ArrowUpRight />
                </a>
                <a className="text-link" href="#capabilities">
                  See what it can do <span>↘</span>
                </a>
              </div>
            </div>

            <div className="hero-art" aria-label="Abstract reflective chrome sculpture">
              <div className="hero-chrome">
                <div className="chrome-halo halo-one" />
                <div className="chrome-halo halo-two" />
                <div className="chrome-orb">
                  <div className="orb-reflection" />
                </div>
                <div className="chrome-ring ring-back" />
                <div className="chrome-ring ring-front" />
                <div className="chrome-orbit orbit-thin" />
                <div className="chrome-orbit orbit-wide" />
                <div className="chrome-glint glint-one" />
                <div className="chrome-glint glint-two" />
              </div>
              <div className="orbit-caption">
                <span className="orbit-caption-line" />
                <span>THOUGHT, IN MOTION</span>
              </div>
              <span className="art-index">T / 01</span>
            </div>

            <div className="hero-bottom">
              <span className="hero-note">A little more clarity. A lot more possibility.</span>
              <a href="#approach" className="scroll-cue">
                <span>SCROLL TO EXPLORE</span>
                <ArrowDown />
              </a>
              <span className="hero-coordinate">THEO / PERSONAL AI</span>
            </div>
          </section>

          <section className="approach section-pad" id="approach" data-swarm-target="approach">
            <div className="section-index" data-reveal>
              <span>01 / THE IDEA</span>
              <span className="index-rule" />
              <span>MEET THEO</span>
            </div>
            <div className="approach-layout">
              <div className="approach-heading" data-reveal>
                <p className="eyebrow">A BETTER KIND OF BACK-AND-FORTH</p>
                <h2>
                  Your thoughts
                  <br />
                  have <em>somewhere</em>
                  <br />
                  to go.
                </h2>
              </div>
              <div className="approach-copy" data-reveal>
                <p className="lead-copy">
                  The best ideas rarely arrive in a straight line. Theo gives you room to question, create, learn, and find your next step.
                </p>
                <p className="muted-copy">
                  Start with a passing thought. Bring a problem you're working through. Keep shaping it until it becomes something real.
                </p>
                <a href="#capabilities" className="underlined-link">
                  Get to know the possibilities <span>↗</span>
                </a>
              </div>
            </div>
            <div className="approach-foot" data-reveal>
              <span>LESS FRICTION BETWEEN THINKING AND DOING.</span>
              <span className="silver-line" />
              <span>BUILT AROUND YOUR MOMENTUM.</span>
            </div>
          </section>

          <section className="capabilities section-pad" id="capabilities" data-swarm-target="capabilities">
            <div className="section-index" data-reveal>
              <span>02 / WHAT IT HELPS YOU DO</span>
              <span className="index-rule" />
              <span>CAPABILITIES</span>
            </div>
            <div className="capabilities-heading" data-reveal>
              <p className="eyebrow">ONE PLACE TO BEGIN</p>
              <h2>Make space for<br /><em>what's next.</em></h2>
              <p className="muted-copy">A useful conversation can become a lot of things. Start wherever you are.</p>
            </div>

            <div className="capability-list">
              <article className="capability-row" data-reveal>
                <div className="capability-number">01</div>
                <div className="capability-main">
                  <h3>Think out loud.</h3>
                  <p>Work through questions, untangle ideas, and turn a vague thought into a clearer direction.</p>
                </div>
                <div className="capability-visual thought-visual" aria-hidden="true">
                  <div className="thought-orb" />
                  <span className="thought-line line-a" />
                  <span className="thought-line line-b" />
                  <span className="thought-line line-c" />
                  <span className="thought-label">IDEA → CLARITY</span>
                </div>
                <div className="capability-arrow"><ArrowUpRight /></div>
              </article>

              <article className="capability-row" data-reveal>
                <div className="capability-number">02</div>
                <div className="capability-main">
                  <h3>Bring the context.</h3>
                  <p>Give the conversation more to work with, so the help you get connects to what you're doing.</p>
                </div>
                <div className="capability-visual context-visual" aria-hidden="true">
                  <div className="context-window">
                    <span className="context-window-bar"><i /><i /><i /></span>
                    <span className="context-window-lines"><i /><i /><i /></span>
                    <span className="context-focus" />
                  </div>
                  <span className="context-scan" />
                </div>
                <div className="capability-arrow"><ArrowUpRight /></div>
              </article>

              <article className="capability-row" data-reveal>
                <div className="capability-number">03</div>
                <div className="capability-main">
                  <h3>Move ideas forward.</h3>
                  <p>Shape your plans into manageable actions, and make room for the work that comes next.</p>
                </div>
                <div className="capability-visual action-visual" aria-hidden="true">
                  <div className="action-orbit orbit-a" />
                  <div className="action-orbit orbit-b" />
                  <div className="action-core"><span>✓</span></div>
                  <span className="action-node node-a" />
                  <span className="action-node node-b" />
                  <span className="action-node node-c" />
                </div>
                <div className="capability-arrow"><ArrowUpRight /></div>
              </article>
            </div>
          </section>

          <section className="experience section-pad" id="experience" data-swarm-target="experience">
            <div className="section-index" data-reveal>
              <span>03 / THE EXPERIENCE</span>
              <span className="index-rule" />
              <span>MADE TO FEEL NATURAL</span>
            </div>
            <div className="experience-layout">
              <div className="experience-copy" data-reveal>
                <p className="eyebrow">A CONVERSATION THAT CAN GO SOMEWHERE</p>
                <h2>Start anywhere.<br /><em>Find your way.</em></h2>
                <p className="muted-copy">
                  No complicated setup to understand. Just bring the thing on your mind and build from there.
                </p>
                <div className="experience-points">
                  <span><i /> Natural conversations</span>
                  <span><i /> Space to explore ideas</span>
                  <span><i /> A path from thought to action</span>
                </div>
              </div>

              <div className="device-stage" data-reveal>
                <div className="device-shadow" />
                <div className="device-frame">
                  <div className="device-island" />
                  <div className="device-screen">
                    <div className="device-topline">
                      <span>9:41</span>
                      <span className="device-signal"><i /><i /><i /></span>
                    </div>
                    <div className="device-appbar">
                      <div className="device-appmark"><TheoMark /></div>
                      <span>theo</span>
                      <span className="device-menu">•••</span>
                    </div>
                    <div className="chat-greeting">
                      <span className="greeting-mark"><TheoMark /></span>
                      <p>Good to see you.</p>
                      <span>What are we thinking about today?</span>
                    </div>
                    <div className="chat-message user-message">Help me make sense of a big idea I've been thinking about.</div>
                    <div className="chat-reply">
                      <span className="reply-label">THEO</span>
                      <p>Let's unpack it together. What's the part you keep coming back to?</p>
                      <div className="reply-actions"><span>↗</span><span>⌁</span><span>⋯</span></div>
                    </div>
                    <div className="chat-compose">
                      <span>Message Theo...</span>
                      <b>↑</b>
                    </div>
                    <div className="device-home-indicator" />
                  </div>
                </div>
                <div className="device-orbit orbit-one" />
                <div className="device-orbit orbit-two" />
                <span className="device-caption caption-left">A THOUGHT, SHARED.</span>
                <span className="device-caption caption-right">A DIRECTION, FOUND.</span>
              </div>
            </div>
          </section>

          <section className="closing section-pad" data-swarm-target="closing">
            <div className="closing-art" aria-hidden="true">
              <div className="closing-ring closing-ring-one" />
              <div className="closing-ring closing-ring-two" />
              <div className="closing-core" />
            </div>
            <div className="closing-content" data-reveal>
              <p className="eyebrow">THE NEXT THING STARTS SOMEWHERE</p>
              <h2>Make room for<br /><em>what's possible.</em></h2>
              <p>Bring the thought. Theo will help you explore where it can go.</p>
              <a href="#top" className="button-primary button-primary-light">
                Back to the beginning <ArrowUpRight />
              </a>
            </div>
            <div className="closing-index">T / 04</div>
          </section>
        </main>

        <footer className="footer">
          <a className="brand footer-brand" href="#top" aria-label="Theo home">
            <TheoMark />
            <span>theo</span>
          </a>
          <span className="footer-note">A little more clarity. A lot more possibility.</span>
          <span className="footer-right">© {new Date().getFullYear()} THEO</span>
        </footer>
      </div>
    </>
  );
}
