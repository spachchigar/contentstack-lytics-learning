import parse from "html-react-parser";

type AdditionalParam = {
  title: string;
  title_h2: string;
  title_h3: string;
  description: string;
  html_code: string;
  designation: string;
  name: string;
};

type ObjectProps = {
  html_code_alignment: string;
  title: string;
  description: string;
  html_code: string;
  $: AdditionalParam;
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (typeof window !== "undefined") {
    const jstagInstance = (window as any).jstag;
    jstagInstance.send({
      name,
      email,
    });
  }

  console.log(name, email, message);
  alert("Form submitted");
  (e.target as HTMLFormElement).reset();
};

export default function SectionWithHtmlCode({
  embedCode,
}: {
  embedCode: ObjectProps;
}) {
  if (embedCode.html_code_alignment === "Left") {
    return (
      <div className="contact-page-section max-width">
        <div className="contact-page-content">
          {embedCode.title && (
            <h1 {...(embedCode.$?.title as {})}>{embedCode.title}</h1>
          )}
          {typeof embedCode.description === "string" && (
            <div {...(embedCode.$?.description as {})}>
              {parse(embedCode.description)}
            </div>
          )}
        </div>
        <div className="contact-page-form">
          <form onSubmit={handleSubmit}>
            <div className="input-fields">
              <input placeholder="Name*" />
            </div>
            <div className="input-fields">
              <input placeholder="Email*" />
            </div>
            <div className="text-field">
              <input type="text-area" placeholder="Message*" />
            </div>
            <button type="submit" className="btn primary-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    );
  }
  return (
    <div className="contact-maps-section max-width">
      <div className="maps-details">
        {typeof embedCode.html_code === "string" && (
          <div {...(embedCode.$?.html_code as {})}>
            {parse(embedCode.html_code)}
          </div>
        )}
      </div>
      <div className="contact-maps-content">
        {embedCode.title ? <h2>{embedCode.title}</h2> : ""}
        {typeof embedCode.description === "string" && (
          <div {...(embedCode.$?.description as {})}>
            {parse(embedCode.description)}
          </div>
        )}
      </div>
    </div>
  );
}
