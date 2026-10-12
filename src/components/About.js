import React from "react";

const About = () => {
  const features = [
    {
      icon: "✍️",
      title: "Quick Note Taking",
      description:
        "Capture your ideas, reminders, and important information in seconds.",
    },
    {
      icon: "🗂️",
      title: "Organized Notes",
      description:
        "Keep your notes organized and find the information you need easily.",
    },
    {
      icon: "🔐",
      title: "Secure Access",
      description:
        "Login-protected APIs help ensure that only authenticated users can access protected note operations.",
    },
    {
      icon: "⚡",
      title: "Easy Management",
      description:
        "Create, edit, view, and delete your notes through a simple interface.",
    },
  ];

  return (
    <div className="about-page py-4 py-md-5">
      {/* Hero Section */}
      <section className="bg-dark text-white rounded-4 p-4 p-md-5 mb-5 shadow">
        <div className="row align-items-center g-4">
          <div className="col-lg-8">
            <span className="badge bg-primary rounded-pill px-3 py-2 mb-3">
              ABOUT INOTEBOOK
            </span>

            <h1 className="display-5 fw-bold mb-3">
              Your ideas deserve
              <br />
              <span className="text-info">a better place.</span>
            </h1>

            <p
              className="text-white-50 fs-5 mb-4"
              style={{ maxWidth: "650px" }}
            >
              iNotebook is a simple and convenient space to capture your
              thoughts, organize important information, and manage your notes
              whenever you need them.
            </p>

            <a href="/" className="btn btn-primary btn-lg rounded-pill px-4">
              Explore Your Notes <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="col-lg-4 text-center">
            <div
              className="rounded-4 p-4 mx-auto"
              style={{
                maxWidth: "260px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <div className="display-1 mb-3" aria-hidden="true">
                📒
              </div>
              <h4 className="fw-bold">Think. Write. Remember.</h4>
              <p className="text-white-50 mb-0">
                Everything starts with an idea.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="row align-items-center g-4 mb-5">
        <div className="col-lg-5">
          <span className="text-primary fw-semibold text-uppercase small">
            Our Purpose
          </span>
          <h2 className="display-6 fw-bold mt-2 mb-3">
            Less clutter.
            <br />
            More clarity.
          </h2>
        </div>

        <div className="col-lg-7">
          <p className="text-secondary fs-5 mb-0">
            Keeping track of ideas should feel effortless. iNotebook brings
            essential note-taking features into one straightforward application,
            so you can focus on what matters instead of managing scattered
            information.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="mb-5">
        <div className="text-center mb-4">
          <span className="text-primary fw-semibold text-uppercase small">
            What You Get
          </span>
          <h2 className="fw-bold mt-2">
            Everything you need to stay organized
          </h2>
          <p className="text-secondary">
            Simple tools designed for everyday productivity.
          </p>
        </div>

        <div className="row g-4">
          {features.map((feature, index) => (
            <div className="col-sm-6 col-lg-3" key={feature.title}>
              <div
                className="card h-100 border-0 shadow-sm rounded-4"
                style={{
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <div className="card-body p-4">
                  <div
                    className="rounded-3 bg-primary bg-opacity-10 d-flex align-items-center justify-content-center mb-3"
                    style={{ width: "56px", height: "56px", fontSize: "26px" }}
                  >
                    {feature.icon}
                  </div>

                  <div className="text-primary small fw-semibold mb-2">
                    FEATURE 0{index + 1}
                  </div>

                  <h5 className="fw-bold mb-3">{feature.title}</h5>
                  <p className="text-secondary mb-0">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-light rounded-4 p-4 p-md-5 mb-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Get started in three steps</h2>
          <p className="text-secondary mb-0">
            Your workflow, without unnecessary complexity.
          </p>
        </div>

        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3 fw-bold fs-4"
              style={{ width: "56px", height: "56px" }}
            >
              1
            </div>
            <h5 className="fw-bold">Sign In</h5>
            <p className="text-secondary mb-0">
              Access your account to manage your notes.
            </p>
          </div>

          <div className="col-md-4">
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3 fw-bold fs-4"
              style={{ width: "56px", height: "56px" }}
            >
              2
            </div>
            <h5 className="fw-bold">Create a Note</h5>
            <p className="text-secondary mb-0">
              Write down an idea, task, or important detail.
            </p>
          </div>

          <div className="col-md-4">
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3 fw-bold fs-4"
              style={{ width: "56px", height: "56px" }}
            >
              3
            </div>
            <h5 className="fw-bold">Stay Organized</h5>
            <p className="text-secondary mb-0">
              Update your notes whenever your ideas change.
            </p>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="border rounded-4 p-4 p-md-5 mb-5">
        <div className="row align-items-center g-3">
          <div className="col-md-2 text-center">
            <div className="display-3" aria-hidden="true">
              🛡️
            </div>
          </div>

          <div className="col-md-10">
            <h3 className="fw-bold">Built with authentication in mind</h3>
            <p className="text-secondary mb-0">
              iNotebook uses account authentication and protected backend
              endpoints for note operations. Always keep your login credentials
              private and log out when using a shared device.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="text-center py-4">
        <h2 className="fw-bold mb-3">Ready to organize your thoughts?</h2>
        <p className="text-secondary mb-4">
          Open your notebook and turn your ideas into something useful.
        </p>

        <a href="/" className="btn btn-primary btn-lg rounded-pill px-5">
          Go to My Notebook →
        </a>
      </section>

      {/* Footer */}
      <footer className="border-top mt-4 pt-4 text-center">
        <p className="text-secondary small mb-1">
          Made for ideas, notes, and everyday productivity.
        </p>
        <p className="text-secondary small mb-0">
          © {new Date().getFullYear()} iNotebook. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default About;
