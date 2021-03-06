

const RegisterForm = ({    
    handleSubmit,
    username,
    setUserName,
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword
    // confirmPassword,
    // setConfirmPassword
}) => (
    <form onSubmit={ handleSubmit } className="mt-3">

        {/* For name */}
        <div className="form-group mb-3">
        <label className="form-label">Full Name</label>
        <input className="form-control" 
        type="text" 
        placeholder="Enter Full Name"
        value={fullName} 
        onChange={(e) => setFullName(e.target.value)}>
        </input>
        </div>

        <div className="form-group mb-3">
        <label className="form-label">Username</label>
        <input className="form-control" 
        type="text" 
        placeholder="Enter username"
        value={username} 
        onChange={(e) => setUserName(e.target.value)}>
        </input>
        </div>
{/* 
        <div className="row mb-3">
        {/* First Name */}
            {/* <div className="col">
                <label className="form-label">First Name</label>
                <input 
                type="text" 
                className="form-control" 
                placeholder="First name" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)}
                />
            </div> */}
            {/* Last Name */}
            {/* <div className="col">
                <label className="form-label">Last Name</label>
                <input 
                type="text" 
                className="form-control" 
                placeholder="Last name" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)}
                />
            </div>  
        </div> */}

        {/* For Email */}
        <div className="form-group mb-3">
        <label className="form-label">Email</label>
        <input className="form-control" 
        type="email" 
        placeholder="Personal Email"
        value={email} 
        onChange={(e) => setEmail(e.target.value)}>
        </input>
        </div>

        {/* For Phone Number */}
        {/* <div className="form-group mb-3">
        <label className="form-label">Phone Number</label>
        <input className="form-control" 
        type="phoneNumber" 
        placeholder="Phone Number"
        value={phoneNumber} 
        onChange={(e) => setPhoneNumber(e.target.value)}>
        </input>
        </div> */}

        {/* For Password */}
        <div className="form-group mb-3">
        <label className="form-label">Password</label>
        <input className="form-control" 
        type="password" 
        placeholder="password should be 8 characters"
        value={password} 
        onChange={(e) => setPassword(e.target.value)}>
        </input>
        </div>

        {/* For Confirm Password */}
        {/* <div className="form-group mb-3">
        <label className="form-label">Confirm Password</label>
        <input className="form-control" 
        type="password" 
        placeholder="Type in your password"
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)}>
        </input>
        </div> */}

        <button
        disabled={ !fullName || !username || !email || !password} 
        className="btn btn-primary" >Submit</button>

        </form>

);

export default RegisterForm;
