// ...existing code...
import React, { FormEvent, RefObject, useState, useEffect } from "react";
import { useUpdateMovieMutation } from "../../state/movies/movieApiSlice"; 
import { Movie } from "../Movies";

interface EditModalProps {
    dialogRef: RefObject<HTMLDialogElement>;
    selectedMovie: Movie;
    closeDialog: () => void;
}

function EditModal({ dialogRef, selectedMovie, closeDialog }: EditModalProps) {
    const [title, setTitle] = useState<string>(selectedMovie.title);
    const [description, setDescription] = useState<string>(selectedMovie.description);
    const [year, setYear] = useState<string | number>(selectedMovie.year);
    const [thumbnail, setThumbnail] = useState<string>(selectedMovie.thumbnail);

    // keep inputs in sync when a new movie is selected
    useEffect(() => {
      setTitle(selectedMovie.title);
      setDescription(selectedMovie.description);
      setYear(selectedMovie.year);
      setThumbnail(selectedMovie.thumbnail);
    }, [selectedMovie]);

    const [updateMovie] = useUpdateMovieMutation();

    async function handleUpdateMovie(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await updateMovie({ title, description, year: Number(year), thumbnail, id: selectedMovie.id }).unwrap();
            closeDialog();
        } catch (error) {
            alert(`${error} occurred`);
        }
    }

    return (
    <dialog
      ref={dialogRef}
      className=" modal-dialog fixed inset-0 z-50 p-4 bg-black/50 flex items-center justify-center"
      onClick={(e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === dialogRef.current) closeDialog();
      }}
    >
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg w-full max-w-2xl p-6 ring-1 ring-slate-900/5">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Edit Movie</h2>

        <form onSubmit={handleUpdateMovie} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              Year of release
            </label>
            <input
              id="year"
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div>
            <label htmlFor="thumbnail" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              Image URL
            </label>
            <input
              id="thumbnail"
              type="text"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={closeDialog}
              className="mr-3 inline-flex items-center px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-sm rounded-md text-slate-700 dark:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </dialog>
    );
}

export default EditModal;
// ...existing code...