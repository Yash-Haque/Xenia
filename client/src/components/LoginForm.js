const LoginForm = ({    
    handleSubmit,
    username,
    setUserName,
    password,
    setPassword}) => (
    <form onSubmit={
        handleSubmit} className="mt-3">


        {/* For Email */}
        <div className="form-group mb-3">
        <label className="form-label">Email</label>
        <input  
        type="email" 
        className="form-control"
        placeholder="personal email"
        value={username} 
        onChange={(e) => setUserName(e.target.value)}>
        </input>
        </div>

        {/* For Password */}
        <div className="form-group mb-3">
        <label className="form-label">Password</label>
        <input  
        type="password"
        className="form-control" 
        placeholder="password should be 8 characters"
        value={password} 
        onChange={(e) => setPassword(e.target.value)}>
        </input>
        </div>

        <button disabled={ !username || !password }
        className="btn btn-primary">Submit</button>

        </form>
);

export default LoginForm;
