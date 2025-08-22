import React from 'react'

const WidgetsCard = ({ item, isEven }) => {
    const bgClass = isEven ? "light-variant-four" : "light-variant-six";



    return (
        <>
            <div style={{ backgroundColor: `var(--${bgClass})` }} className="rounded-md p-5">
                <p className="text-sm font-semibold text-primary-black mb-2">{item.title}</p>
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl leading-9 font-semibold text-primary-black">{item.value}</h2>
                    <div className="flex items-center gap-1">
                        {/* <p className="text-xs leading-[18px] text-primary-black">+11.01%</p> */}
                    </div>
                </div>
            </div >


        </>
    )
}

export default WidgetsCard