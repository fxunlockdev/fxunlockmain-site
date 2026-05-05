/* Tweaks panel */

function FXTweaks() {
  const [tweaks, setTweak] = useTweaks(/*EDITMODE-BEGIN*/{
    "accent": "cyan",
    "density": "comfortable",
    "showFloatingSide": true,
    "showMarquee": true,
    "heroStyle": "editorial"
  }/*EDITMODE-END*/);

  React.useEffect(() => {
    const root = document.documentElement;
    const accents = {
      cyan:   { primary: "#00e5ff", secondary: "#6f5cff" },
      violet: { primary: "#9b6cff", secondary: "#ff5acb" },
      lime:   { primary: "#c7ff3f", secondary: "#00e5ff" },
      amber:  { primary: "#ffb940", secondary: "#ff5470" },
    };
    const a = accents[tweaks.accent] || accents.cyan;
    root.style.setProperty('--cyan', a.primary);
    root.style.setProperty('--violet', a.secondary);
  }, [tweaks.accent]);

  React.useEffect(() => {
    const fs = document.querySelector('.floating-side');
    if (fs) fs.style.display = tweaks.showFloatingSide ? '' : 'none';
    const mq = document.querySelector('.marquee-section');
    if (mq) mq.style.display = tweaks.showMarquee ? '' : 'none';
  }, [tweaks.showFloatingSide, tweaks.showMarquee]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Accent">
        <TweakRadio
          value={tweaks.accent}
          onChange={v => setTweak('accent', v)}
          options={[
            { value: 'cyan', label: 'Cyan' },
            { value: 'violet', label: 'Violet' },
            { value: 'lime', label: 'Lime' },
            { value: 'amber', label: 'Amber' },
          ]}
        />
      </TweakSection>
      <TweakSection title="Sections">
        <TweakToggle label="Floating side icons" value={tweaks.showFloatingSide} onChange={v => setTweak('showFloatingSide', v)}/>
        <TweakToggle label="Partners marquee" value={tweaks.showMarquee} onChange={v => setTweak('showMarquee', v)}/>
      </TweakSection>
    </TweaksPanel>
  );
}

window.FXTweaks = FXTweaks;
