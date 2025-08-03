import { forwardRef, useId } from "react"

const Input = forwardRef(({
    label,
    type = "text",
    className= "inline-block rounded-xl text-black",
    ...props
} , ref)=>{
    const id = useId();
    return (
        <div>
            {label && (
                <label className="block mb-2 text-sm font-medium text-[#e0def4]">{label}</label>
            )}
            <input
                ref={ref}
                className={`block w-full px-4 py-3 border border-[#393552] rounded-lg placeholder-gray-400 bg-[#1f1d2b] text-gray-100 focus:ring-4 focus:ring-[#b4637a]/30 focus:border-[#b4637a] transition ${className}`}
            {...props}
            />
        </div>
    )
    

})

export default Input