const FormInput = (props) => {
    return (
        <div className="w-[370px] flex flex-col gap-1">
            <label htmlFor={props.id}>{props.title}</label>
            <input className={`text-gray-800 h-[40px] w-[370px] bg-white p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#f48c06]`} type={props.type} id={props.id} name={props.name} placeholder={props.title} onChange={props.onChange} />
        </div>
    )
}

export default FormInput