import React, { useContext, useState } from "react";
import { Notes } from "./Notes";
import noteContext from "../context/noteContext";

const Home = () => {
  const { addNote, showAlert } = useContext(noteContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("general");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !tag.trim()) {
      showAlert("Please fill all fields!", "danger");
      return;
    }

    setSubmitting(true);

    try {
      const success = await addNote(
        title.trim(),
        description.trim(),
        tag.trim(),
      );

      if (success) {
        setTitle("");
        setDescription("");
        setTag("general");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="mb-4">
              <h2 className="fw-bold">Add a Note</h2>
              <p className="text-muted mb-0">
                Create and manage your notes in one place.
              </p>
            </div>

            <form
              className="card border-0 shadow-sm rounded-4 p-3 p-md-4"
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <label htmlFor="title" className="form-label fw-semibold">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg rounded-3"
                  id="title"
                  placeholder="Enter note title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label fw-semibold">
                  Description
                </label>
                <textarea
                  className="form-control rounded-3"
                  id="description"
                  rows="4"
                  placeholder="Write your note here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="tag" className="form-label fw-semibold">
                  Tag
                </label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="tag"
                  placeholder="e.g. general, work, personal"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="btn btn-primary rounded-3 px-4 py-2"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-plus me-2" />
                      Add Note
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Notes />
    </>
  );
};

export default Home;
