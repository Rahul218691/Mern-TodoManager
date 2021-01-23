import React from 'react'

function ProfilePage() {
    return (
        <div className="container mt-5">
            <h4 className="text-center">User Profile</h4>
            <div className="row">
                    <div className="col-md-4">
                        <img src="" className="img-fluid" alt=""/>
                    </div>
                    <div className="col-md-8">
                        <form>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" placeholder="username"
                                className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" placeholder="abc@gmail.com"
                                className="form-control"
                                readOnly
                                />
                            </div>
                        </form>
                    </div>
            </div>
        </div>
    )
}

export default ProfilePage;
