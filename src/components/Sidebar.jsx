import React, { useState } from "react"

function Sidebar({ categories, selected, onSelect, onAddCategory }) {
    const [showPopup, setShowPopup] = useState(false)
    const [newCategory, setNewCategory] = useState('')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleAddClick = () => {
        setShowPopup(true)
    }

    const handlePopupAdd = () => {
        if (newCategory) {
            onAddCategory(newCategory)
            setNewCategory('')
            setShowPopup(false)
        }
    }

    const handlePopupClose = () => {
        setShowPopup(false)
        setNewCategory('')
    }

    const SidebarContent = (
        <>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Categories</h2>
            </div>

            <ul className="space-y-2">      {/* gap-y-2 or my-2 doesn't yield the same result as space is specifically made to provide spacing between children. Gap or margin can be used on list items to achieve similar results */}
                {categories.map((eachCategory) => (
                    <li key={eachCategory} onClick={() => {onSelect(eachCategory); setMobileMenuOpen(false)}} className={`p-2 rounded cursor-pointer ${eachCategory === selected ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-200'}`}> {eachCategory} </li>
                ))}
            </ul>

            <button onClick={handleAddClick} className="bg-blue-500 text-white rounded-2xl px-2 py-1 text-lg cursor-pointer mt-3 hover:bg-blue-600">+</button>
        </>
    )

    return (
        <>
            {/* Sidebar for desktop view: */}
            <div className={`hidden md:flex w-1/5 p-4 flex-col min-h-screen`}>    {/* hidden class used to hide the sidebar in mobile view. */}
                {/* My opened hamburger menu doesn't disappear even if the width exceeds mobile view width.
                    In the above line, writing: md:${setShowPopup(false)} doesn't work. Error: too many re-renders.
                    FIGURE OUT A DIFFERENT WAY.
                    Update: It was simple. Just added md:hidden in mobile menu div. */}

                {SidebarContent}
                
                {showPopup && (
                    /* Design of popup window:
                            A div covers enite window. Inside that div there is another div that displays the popup window.
                    */
                    
                    // Need to figure out how to close the popup if clicked outside the window.
                    // Update: Figured out:
                    // Adding handlePopupClose and stopPropogation allows to close the popup window if clicked anywhere outside it.
                    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50" onClick={handlePopupClose}>    {/* inset-0: makes margin from all sides equal to 0. The /80 in bg denotes opacity. */} 
                        <div className="bg-white p-6 rounded-2xl flex flex-col gap-y-3" onClick={event => event.stopPropagation()}>     {/* Here, bg-white is necessary otherwise the color would be bg-black/80 */}
                            <input type="text" value={newCategory} onChange={event => setNewCategory(event.target.value)} className="bg-gray-100 rounded-full px-4 py-2 outline-none" placeholder="Category name"/>
                            <div className="flex justify-center gap-x-2 mt-2">
                                <button onClick={handlePopupAdd} className="bg-blue-500 text-white rounded-full px-4 py-1 hover:bg-blue-600 cursor-pointer">Add</button>
                                <button onClick={handlePopupClose} className="bg-gray-400 text-white rounded-full px-4 py-1 hover:bg-red-400 cursor-pointer">Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Hamburger Icon for mobile view: */}     {/* HTML code is used for hamburger menu icon. */}
            <button className="md:hidden fixed top-4 left-4 z-50 text-3xl bg-transparent border-none p-0 m-0 focus:outline-none" onClick={() => setMobileMenuOpen(true)}> &#9776; </button>

            {/* Hamburger Menu for mobile view: */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white fixed inset-0 z-50 flex flex-col p-6">   {/* Without bg-white my menu is transparent, don't know why. */}
                    
                    <div className="flex justify-end mb-4">     {/* HTML code used for x button. */}
                        <button onClick={() => setMobileMenuOpen(false)} className="text-3xl focus:outline-none"> &times; </button>
                    </div>

                    {SidebarContent}
                    
                    {showPopup && (     //This show popup code is written twice, will fix this using utility functions.
                        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50" onClick={handlePopupClose}>
                            <div className="bg-white p-6 rounded-2xl flex flex-col gap-y-3" onClick={event => event.stopPropagation()}>
                                <input type="text" value={newCategory} onChange={event => setNewCategory(event.target.value)} className="bg-gray-100 rounded-full px-4 py-2 outline-none" placeholder="Category name"/>
                                <div className="flex justify-center gap-x-2 mt-2">
                                    <button onClick={handlePopupAdd} className="bg-blue-500 text-white rounded-full px-4 py-1 hover:bg-blue-600 cursor-pointer">Add</button>
                                    <button onClick={handlePopupClose} className="bg-gray-400 text-white rounded-full px-4 py-1 hover:bg-red-400 cursor-pointer">Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default Sidebar