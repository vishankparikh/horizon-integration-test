import React, { Component } from 'react';
import './LoginDialog.scss'

class LoginDialog extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isRegisterActive: true,
            formData: {
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            },
            formDataEmptyFields: Object.assign({}, this.formData)
        }
    }
    componentDidMount() {
        this._isMounted = true;
    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    toggleForm = (e, value) => {
        const { isRegisterActive } = this.state;
        if (isRegisterActive !== value) {
            const formData = {
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            }
            this.setState({
                isRegisterActive: value,
                formData: formData,
                formDataEmptyFields: formData
            });
        }

    }
    handleChange = (e, type) => {
        const { formData } = this.state;
        switch (type) {
            case "firstName":
                this.setState({ formData: { ...formData, firstName: e.target.value } });
                break;
            case "lastName":
                this.setState({ formData: { ...formData, lastName: e.target.value } });
                break;
            case "email":
                this.setState({ formData: { ...formData, email: e.target.value } });
                break;
            case "password":
                this.setState({ formData: { ...formData, password: e.target.value } });
                break;
            default:
                break;
        }
    }
    submitForm = (e, stateValue) => {
        this.checkRequiredFields();
    }
    checkRequiredFields = () => {
        const { formData } = this.state;
        let { formDataEmptyFields } = this.state;
        for (let key in formData) {
            if (formData[key].length === 0) {
                formDataEmptyFields[key] = true;
            } else {
                formDataEmptyFields[key] = false;
            }
        }
        this.setState({ formDataEmptyFields: formDataEmptyFields })

    }
    render() {
        console.log("From LoginDialog State ---> ", this.state);
        const { isRegisterActive, formData, formDataEmptyFields } = this.state;
        return (
            <div className="LoginDialog">
                <div className="dialogContainer">
                    <div className="headerButtonsWrapper">
                        <div
                            className={["register btn", isRegisterActive ? "btnActive" : ""].join(' ')}

                            onClick={e => this.toggleForm(e, true)}
                        >Register</div>
                        <div
                            className={["register btn", isRegisterActive ? "" : "btnActive"].join(' ')}

                            onClick={e => this.toggleForm(e, false)}
                        >Log In</div>
                    </div>
                    <div className="bodyContent">
                        <div className="titleText">
                            {isRegisterActive ? "Sign Up for Free." : "Welcome Back!"}
                        </div>
                        {isRegisterActive &&
                            <input
                                placeholder="First Mame"
                                className={["textbox", "nameBox", formDataEmptyFields.firstName === true && "textboxRequired"].join(" ")}
                                value={formData.firstName}
                                onChange={e => this.handleChange(e, "firstName")}
                            />}
                        {isRegisterActive &&
                            <input
                                placeholder="Last Name"
                                className={["textbox", "nameBox", formDataEmptyFields.lastName === true && "textboxRequired"].join(" ")}
                                value={formData.lastName}
                                onChange={e => this.handleChange(e, "lastName")}
                            />}
                        <input
                            className={["textbox", formDataEmptyFields.email === true && "textboxRequired"].join(" ")}
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={e => this.handleChange(e, "email")}
                        />
                        <input
                            className={["textbox", formDataEmptyFields.password === true && "textboxRequired"].join(" ")}
                            type="password"
                            placeholder={isRegisterActive ? "Set a Password" : "Password"}
                            value={formData.password}
                            onChange={e => this.handleChange(e, "password")}
                        />
                    </div>

                    <div
                        className="actionButton"
                        onClick={e => this.submitForm(e, isRegisterActive)}
                    >
                        {isRegisterActive ? "GET STARTED" : "LOG IN"}</div>
                </div>

            </div>

        );
    }
}

export default LoginDialog;