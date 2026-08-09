const { Toast, ToastStack } = window.ForageDesignSystem_98e604;

function App() {
  const D = window.FORAGE_DATA;
  const [step, setStep] = React.useState(0);
  const [text, setText] = React.useState("");
  const [target, setTarget] = React.useState(null);
  const [saved, setSaved] = React.useState([]);
  const [toast, setToast] = React.useState(null);

  const save = (job) => {
    const on = saved.indexOf(job.id) > -1;
    setSaved(on ? saved.filter((i) => i !== job.id) : saved.concat(job.id));
    setToast(on ? null : { title: "Saved " + job.role, body: job.org });
  };
  React.useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 3200); return () => clearTimeout(t); }, [toast]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppHeader step={step} onHome={() => setStep(0)} />
      <div style={{ flex: "1 0 auto" }}>
        {step === 0 ? <DescribeScreen text={text} setText={setText} onSubmit={() => setStep(1)} /> : null}
        {step === 1 ? <MatchScreen text={text} target={target} onPick={setTarget} onBack={() => setStep(0)} onNext={() => setStep(3)} /> : null}
        {step === 3 ? <GapScreen target={target} onBack={() => setStep(1)} onNext={() => setStep(4)} /> : null}
        {step === 4 ? <RolesScreen target={target} savedIds={saved} onSave={save} onBack={() => setStep(3)} /> : null}
      </div>
      <AppFooter />
      {toast ? <ToastStack><Toast tone="positive" title={toast.title} onClose={() => setToast(null)}>{toast.body}</Toast></ToastStack> : null}
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
