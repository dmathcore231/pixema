import "./styles.scss"
import { FormInput } from "../../components/FormInput"
import { Switch } from "../../components/Switch"

export function Settings() {
  return (
    <div className="settings">
      <form className="settings__content">
        <div className="settings__item">
          <div className="settings__title">
            <h2>Profile</h2>
          </div>
          <div className="settings__wrapper">
            <div className="settings__input">
              <FormInput
                label={true}
                children="Name"
                htmlFor="name-input"
                type="text"
                id="name-input"
                placeholder="Your name"
              />
            </div>
            <div className="settings__input">
              <FormInput
                label={true}
                htmlFor="email-input"
                children="Email"
                type="email"
                id="email-input"
                placeholder="Your email"
              />
            </div>
          </div>
        </div>
        <div className="settings__item">
          <div className="settings__title">
            <h2>Password</h2>
          </div>
          <div className="settings__wrapper">
            <div className="settings__input">
              <FormInput
                label={true}
                htmlFor="password-input"
                children="Password"
                type="password"
                id="password-input"
                placeholder="Your password"
              />
            </div>
            <div className="settings__input-wrapper">
              <div className="settings__input">
                <FormInput
                  label={true}
                  htmlFor="new-password-input"
                  children="New password"
                  type="password"
                  id="New-password-input"
                  placeholder="New password"
                />
              </div>
              <div className="settings__input">
                <FormInput
                  label={true}
                  htmlFor="confirm-password-input"
                  children="Confirm password"
                  type="password"
                  id="confirm-password-input"
                  placeholder="Confirm password"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="settings__item">
          <div className="settings__title">
            <h2>Color mode</h2>
          </div>
          <div className="settings__wrapper">
            <div className="settings__mode-text">
              <div className="subtitle subtitle_size_s ">
                Dark
              </div>
              <div className="subtitle subtitle_size_xxs subtitle_weight_500 subtitle_color_secondary">
                Use dark thema
              </div>
            </div>
            <div className="settings__mode-switch">
              <Switch />
            </div>
          </div>
        </div>
        <div className="settings__item">
          <div className="settings__btn">
            <button className="btn btn_secondary">Cancel</button>
            <button className="btn btn_primary">Save</button>
          </div>
        </div>
      </form>
    </div>
  )
}
