import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import MainWindow from '../components/MainWindow'
import AddNotePopup from '../components/AddNotePopup'

function NotesPage() {
    const [categories, setCategories] = useState(['Life', 'School', 'Friends', 'Work'])
    const [selectedCategory, setSelectedCategory] = useState('Life')
    const [notes, setNotes] = useState({ Life: [], School: [], Friends: [], Work: [] })
    const [showNotePopup, setShowNotePopup] = useState(false)

    const addCategory = (name) => {
        if (name && !categories.includes(name)) {
            setCategories([...categories, name])
            setNotes(prev => ({ ...prev, [name]: [] }))     //can't access [name] like name because it will create a key named 'name'.
        }
    }

    const addNote = (note) => {
        setNotes(prev => ({ ...prev, [selectedCategory]: [...prev[selectedCategory], note] }))
    }

    return (
        <div className="flex h-screen">
            <Sidebar categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} onAddCategory={addCategory} />
            <MainWindow notes={notes[selectedCategory]} onAddNote={addNote} onShowAddNotePopup={() => setShowNotePopup(true)} />

            {showNotePopup && (
                <AddNotePopup onAddNote={addNote} onClose={() => setShowNotePopup(false)} />
            )}

        </div>
    );
}

export default NotesPage