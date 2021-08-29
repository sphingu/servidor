import { core, arg, nonNull, intArg, stringArg } from 'nexus'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const dateTimeArg = (opts: core.NexusArgConfig<'DateTime'>) =>
  arg({ ...opts, type: 'DateTime' })

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const requiredInt = (opts: core.ScalarArgConfig<number>) =>
  nonNull(intArg({ ...opts }))

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const requiredString = (opts: core.ScalarArgConfig<string>) =>
  nonNull(stringArg({ ...opts }))
