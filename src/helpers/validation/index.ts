import {
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'
import { REGEX } from 'constants/index'

@ValidatorConstraint({ name: 'customText', async: false })
export class AlphaWithSpace implements ValidatorConstraintInterface {
  validate(text: string): boolean {
    return REGEX.ALPHA_WITH_SPACE.test(text)
  }

  defaultMessage(): string {
    return 'Text ($value) should contain alphabet with space only'
  }
}
