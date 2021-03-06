import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { closeModal, register, updateRegistrationForm } from '../../actions';

const RegistrationModal = ({
  closeModal,
  register,
  registrationForm,
  updateRegistrationForm
}) => {
  const { username, email, password1, password2 } = registrationForm;

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Sign Up</p>
        <button className="delete" onClick={closeModal} aria-label="close" />
      </header>
      <section className="modal-card-body">
        <form onSubmit={register}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control has-icons-left">
              <input
                type="text"
                name="username"
                value={username}
                className="input"
                onChange={updateRegistrationForm}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left">
              <input
                type="email"
                name="email"
                value={email}
                className="input"
                onChange={updateRegistrationForm}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left">
              <input
                type="password"
                name="password"
                value={password1}
                className="input"
                onChange={updateRegistrationForm}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control has-icons-left">
              <input
                type="password"
                name="password2"
                value={password2}
                className="input"
                onChange={updateRegistrationForm}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
            </div>
          </div>
          <div className="field is-centered">
            <div className="control">
              <button className="button is-primary" type="submit">
                <strong>Sign Up</strong>
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

RegistrationModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  registrationForm: PropTypes.object.isRequired,
  updateRegistrationForm: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  registrationForm: state.auth.registrationForm
});

export default connect(
  mapStateToProps,
  { closeModal, register, updateRegistrationForm }
)(RegistrationModal);
