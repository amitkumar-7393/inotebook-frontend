import React, { useContext, useState } from "react";
import noteContext from "../context/noteContext";

export const Notes = () => {
  const { notes, deleteNote, editNote, showAlert } = useContext(noteContext);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [currentNote, setCurrentNote] = useState({
    _id: "",
    title: "",
    description: "",
    tag: "general",
  });

  // Open Edit Modal
  const handleEdit = (note) => {
    setCurrentNote({
      ...note,
      tag: note.tag || "general",
    });
    setShowModal(true);
  };

  // Update Form Fields
  const handleChange = (e) => {
    setCurrentNote((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Save Edited Note to MongoDB
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { _id, title, description, tag } = currentNote;

    if (!title.trim() || !description.trim() || !tag.trim()) {
      showAlert("Please fill all fields!", "danger");
      return;
    }

    setSaving(true);

    try {
      const success = await editNote(
        _id,
        title.trim(),
        description.trim(),
        tag.trim(),
      );

      if (success) {
        setShowModal(false);
      }
    } finally {
      setSaving(false);
    }
  };

  // Open Delete Confirmation
  const handleDelete = (note) => {
    setNoteToDelete(note);
    setShowDeleteModal(true);
  };

  // Delete from MongoDB
  const confirmDelete = async () => {
    if (!noteToDelete || deleting) return;

    setDeleting(true);

    try {
      const success = await deleteNote(noteToDelete._id);

      if (success) {
        setShowDeleteModal(false);
        setNoteToDelete(null);
      }
    } finally {
      setDeleting(false);
    }
  };

  const closeDeleteModal = () => {
    if (deleting) return;
    setShowDeleteModal(false);
    setNoteToDelete(null);
  };

  return (
    <>
      <div className="container my-5">
        {/* Heading */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1">Your Notes</h2>
            <p className="text-muted mb-0">
              Manage all your notes in one place
            </p>
          </div>

          <span className="badge bg-primary rounded-pill px-3 py-2">
            {notes.length} Notes
          </span>
        </div>

        {/* Notes List */}
        {notes.length === 0 ? (
          <div className="text-center py-5 border rounded-4">
            <i className="fa-regular fa-note-sticky fs-1 text-muted mb-3 d-block" />
            <h5>No notes yet</h5>
            <p className="text-muted mb-0">
              Add your first note to get started.
            </p>
          </div>
        ) : (
          <div className="row g-4">
            {notes.map((note) => (
              <div className="col-12 col-md-6 col-lg-4" key={note._id}>
                <div className="card h-100 border-0 shadow-sm rounded-4">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                      <h5 className="card-title fw-bold mb-0 text-break">
                        {note.title}
                      </h5>

                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-light text-primary rounded-3"
                          title="Edit Note"
                          aria-label="Edit Note"
                          onClick={() => handleEdit(note)}
                        >
                          <i className="fa-solid fa-pen-to-square" />
                        </button>

                        <button
                          type="button"
                          className="btn btn-light text-danger rounded-3"
                          title="Delete Note"
                          aria-label="Delete Note"
                          onClick={() => handleDelete(note)}
                        >
                          <i className="fa-solid fa-trash-can" />
                        </button>
                      </div>
                    </div>

                    <p className="card-text text-secondary text-break">
                      {note.description}
                    </p>

                    <span className="badge rounded-pill px-3 py-2 bg-primary text-white">
                      <i className="fa-solid fa-tag me-1" />
                      {note.tag || "general"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
          aria-labelledby="editNoteTitle"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.55)",
            zIndex: 1055,
          }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !saving) {
              setShowModal(false);
            }
          }}
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content border-0 rounded-4 shadow-lg">
              <div className="modal-header border-0 px-4 pt-4">
                <div>
                  <h4 className="modal-title fw-bold" id="editNoteTitle">
                    <i className="fa-solid fa-pen-to-square text-primary me-2" />
                    Edit Note
                  </h4>
                  <p className="text-muted small mb-0 mt-1">
                    Make changes to your note below.
                  </p>
                </div>

                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  disabled={saving}
                  onClick={() => setShowModal(false)}
                />
              </div>

              <form onSubmit={handleUpdate}>
                <div className="modal-body px-4 py-3">
                  <div className="mb-3">
                    <label
                      htmlFor="editTitle"
                      className="form-label fw-semibold"
                    >
                      Title
                    </label>
                    <input
                      id="editTitle"
                      name="title"
                      type="text"
                      className="form-control form-control-lg rounded-3"
                      placeholder="Enter note title"
                      value={currentNote.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="editDescription"
                      className="form-label fw-semibold"
                    >
                      Description
                    </label>
                    <textarea
                      id="editDescription"
                      name="description"
                      className="form-control rounded-3"
                      rows="4"
                      placeholder="Write your note..."
                      value={currentNote.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-2">
                    <label htmlFor="editTag" className="form-label fw-semibold">
                      Tag
                    </label>
                    <input
                      id="editTag"
                      name="tag"
                      type="text"
                      className="form-control rounded-3"
                      placeholder="e.g. general, work, personal"
                      value={currentNote.tag}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="modal-footer border-0 px-4 pb-4">
                  <button
                    type="button"
                    className="btn btn-light rounded-3 px-4"
                    disabled={saving}
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary rounded-3 px-4"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-check me-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
          aria-labelledby="deleteNoteTitle"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.60)",
            zIndex: 1060,
          }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeDeleteModal();
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg">
              <div className="modal-body text-center p-4 p-md-5">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                  style={{
                    width: "68px",
                    height: "68px",
                    backgroundColor: "#FDE8E8",
                    color: "#DC3545",
                  }}
                >
                  <i className="fa-solid fa-trash-can fs-3" />
                </div>

                <h4 className="fw-bold mb-2" id="deleteNoteTitle">
                  Delete Note?
                </h4>

                <p className="text-secondary mb-0">
                  Are you sure you want to delete{" "}
                  <strong className="text-dark">{noteToDelete?.title}</strong>?
                  This action cannot be undone.
                </p>

                <div className="d-flex justify-content-center flex-wrap gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-light border rounded-3 px-4 py-2"
                    disabled={deleting}
                    onClick={closeDeleteModal}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger rounded-3 px-4 py-2"
                    disabled={deleting}
                    onClick={confirmDelete}
                  >
                    {deleting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-trash-can me-2" />
                        Delete Note
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notes;
