import React, { useState } from 'react'

export default function BackToTop() {
    const [showBtn, setShowBtn] = useState(false)

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    window.addEventListener('scroll', e => {
        if(document.documentElement.scrollTop > 200) {
            setShowBtn(true)
        } else {
            setShowBtn(false)
        }
    })

    return (
        <>
            {showBtn &&
                <div onClick={scrollToTop} title='Back to Top' className='fixed bottom-5 right-5 mt-5 h-8 w-8 hover:bg-teal-600 cursor-pointer transition-all bg-teal-500 rounded flex items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>
                </div>
            }
        </>
    )
}