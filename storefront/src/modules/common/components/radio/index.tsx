const Radio = ({
  checked,
  "data-testid": dataTestId,
  disabled,
}: {
  checked: boolean
  "data-testid"?: string
  disabled?: boolean
}) => {
  return (
    <>
      <button
        type="button"
        role="radio"
        aria-checked="true"
        data-state={checked ? "checked" : "unchecked"}
        className="group relative flex h-5 w-5 items-center justify-center outline-none"
        data-testid={dataTestId || "radio-button"}
        disabled={disabled}
      >
        <div className={`border-2 transition-all duration-200 flex h-[14px] w-[14px] items-center justify-center rounded-full ${
          checked 
            ? 'bg-[#FF000F] border-[#FF000F]' 
            : 'bg-white border-gray-300 hover:border-gray-400'
        } ${
          disabled 
            ? 'bg-gray-100 border-gray-200 cursor-not-allowed' 
            : 'cursor-pointer'
        }`}>
          {checked && (
            <span
              data-state={checked ? "checked" : "unchecked"}
              className="group flex items-center justify-center"
            >
              <div className="bg-white rounded-full h-1.5 w-1.5"></div>
            </span>
          )}
        </div>
      </button>
    </>
  )
}

export default Radio
