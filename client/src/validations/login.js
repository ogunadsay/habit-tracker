
export default  {
    required : (value) => {
        if (!value.toString().trim().length) {
            // We can return string or jsx as the 'error' prop for the validated Component
            return 'require';
        }
    },
    lt : (value, props) => {
        // get the maxLength from component's props
        if (!value.toString().trim().length > props.maxLength) {
            // Return jsx
            return "The value exceeded {props.maxLength} symbols."
        }
    }
}
