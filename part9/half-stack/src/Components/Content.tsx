import Course from "../types";

const Content = ({ courseParts }: { courseParts: Course[] }) => {
  const assertNever = (value: Course): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  // @ts-ignore
  return (
    <div>
      {courseParts.map((c) => {
        switch (c.type) {
          case "normal":
            return (
              <div>
                <p>
                  <span style={{ fontWeight: "bold" }}>
                    {c.name} {c.exerciseCount}
                  </span>
                </p>
                <p>{c.description}</p>
              </div>
            );
          case "groupProject":
            return (
              <div>
                <p>
                  <span style={{ fontWeight: "bold" }}>
                    {c.name} {c.exerciseCount}
                  </span>
                </p>
                <p>{c.groupProjectCount}</p>
              </div>
            );
          case "submission":
            return (
              <div>
                <p>
                  <span style={{ fontWeight: "bold" }}>
                    {c.name} {c.exerciseCount}
                  </span>
                </p>
                <a href={c.exerciseSubmissionLink}>
                  {c.exerciseSubmissionLink}
                </a>
              </div>
            );
          default:
            return assertNever(c);
        }
      })}
    </div>
  );
};

export default Content;
