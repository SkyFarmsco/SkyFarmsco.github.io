export const validators = {
    email: (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return {
            isValid: regex.test(value),
            message: 'Please enter a valid email address'
        };
    },
    
    required: (value) => ({
        isValid: value.trim().length > 0,
        message: 'This field is required'
    }),
    
    minLength: (value, min) => ({
        isValid: value.length >= min,
        message: `Must be at least ${min} characters`
    }),
    
    phone: (value) => {
        const regex = /^\+?[\d\s-]{8,}$/;
        return {
            isValid: regex.test(value),
            message: 'Please enter a valid phone number'
        };
    }
};

export const validateForm = (formData, rules) => {
    const errors = {};
    
    Object.keys(rules).forEach(field => {
        const value = formData[field];
        const fieldRules = rules[field];
        
        fieldRules.forEach(rule => {
            const validation = validators[rule.type](value, rule.value);
            if (!validation.isValid) {
                errors[field] = validation.message;
            }
        });
    });
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}; 