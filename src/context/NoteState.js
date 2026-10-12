import React, { useState, useRef, useEffect, useCallback } from "react";
import noteContext from "./noteContext";

const API_URL = "http://localhost:5000/api/notes";

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const [alert, setAlert] = useState(null);
  const alertTimer = useRef(null);

  useEffect(() => {
    return () => clearTimeout(alertTimer.current);
  }, []);

  // Show alert for 2 seconds
  const showAlert = useCallback((message, type = "success") => {
    clearTimeout(alertTimer.current);
    setAlert({ message, type });

    alertTimer.current = setTimeout(() => {
      setAlert(null);
    }, 2000);
  }, []);

  // Get authentication token
  const getHeaders = () => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("auth-token");

    if (!token) {
      throw new Error("Please login first.");
    }

    return {
      "Content-Type": "application/json",
      "auth-token": token,
    };
  };

  // Fetch all notes from MongoDB
  const fetchAllNotes = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/fetchallnotes`, {
        method: "GET",
        headers: getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Unable to fetch notes.");
      }

      setNotes(Array.isArray(data) ? data : []);
    } catch (error) {
      showAlert(error.message || "Unable to load notes.", "danger");
    }
  }, [showAlert]);

  useEffect(() => {
    fetchAllNotes();
  }, [fetchAllNotes]);

  // Add Note to MongoDB
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${API_URL}/addnote`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ title, description, tag }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Unable to add note.");
      }

      // Refresh from database
      await fetchAllNotes();
      showAlert("Note added successfully!", "success");
      return true;
    } catch (error) {
      showAlert(error.message || "Failed to add note.", "danger");
      return false;
    }
  };

  // Delete Note from MongoDB
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${API_URL}/deletenote/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Unable to delete note.");
      }

      await fetchAllNotes();
      showAlert("Note deleted successfully!", "success");
      return true;
    } catch (error) {
      showAlert(error.message || "Failed to delete note.", "danger");
      return false;
    }
  };

  // Update Note in MongoDB
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${API_URL}/updatenote/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ title, description, tag }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Unable to update note.");
      }

      await fetchAllNotes();
      showAlert("Note updated successfully!", "success");
      return true;
    } catch (error) {
      showAlert(error.message || "Failed to update note.", "danger");
      return false;
    }
  };

  return (
    <noteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        editNote,
        fetchAllNotes,
        alert,
        showAlert,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
