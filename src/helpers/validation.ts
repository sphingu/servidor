import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { REGEX } from '../constants'

@ValidatorConstraint()
export class AlphaWithSpace implements ValidatorConstraintInterface {
  validate(text: string): boolean {
    return REGEX.ALPHA_WITH_SPACE.test(text)
  }

  defaultMessage(): string {
    return 'Text ($value) should contain alphabet with space only'
  }
}

@ValidatorConstraint()
export class AlphaNumericWithSpace implements ValidatorConstraintInterface {
  validate(text: string): boolean {
    return REGEX.ALPHANUMERIC_WITH_SPACE.test(text)
  }

  defaultMessage(): string {
    return 'Text ($value) should contain alphanumeric with space only'
  }
}
