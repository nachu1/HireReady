function ATSScoreCircle({ score }) {

  const radius = 70;

  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference -
    (score / 100) *
    circumference;

  return (

    <div className="flex justify-center items-center">

      <svg
        width="200"
        height="200"
      >

        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="12"
          fill="none"
        />

        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="#2563eb"
          strokeWidth="12"
          fill="none"
          strokeDasharray={
            circumference
          }
          strokeDashoffset={
            offset
          }
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
        />

        <text
          x="100"
          y="110"
          textAnchor="middle"
          className="text-3xl font-bold"
        >
          {score}%
        </text>

      </svg>

    </div>

  );

}

export default ATSScoreCircle;