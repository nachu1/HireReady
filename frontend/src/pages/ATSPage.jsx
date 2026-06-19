import ATSAnalysis from "../components/ATSAnalysis";

function ATSPage({
  setResumeRequired,
  setResumePending
}) {

  return (
    <ATSAnalysis
      setResumeRequired={
        setResumeRequired
      }
      setResumePending={
        setResumePending
      }
    />
  );

}

export default ATSPage;