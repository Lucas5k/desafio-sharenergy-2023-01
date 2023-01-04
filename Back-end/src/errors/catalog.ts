enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
  EmptyObject = 'EmptyObject',
  IncorrectUser = 'IncorrectUser',
  IncorrectName = 'IncorrectName',
  idInvalid = 'idInvalid',
  IncorrectData = 'IncorrectData'
}

type ErrorResponseObject = {
  message: string,
  httpStatus: number
}

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
};

export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    message: 'Entity not found',
    httpStatus: 404,
  },
  InvalidMongoId: {
    message: 'Id must be a 24 characters hexadecimal',
    httpStatus: 400,
  },
  EmptyObject: {
    message: 'the object must not be empty',
    httpStatus: 400,
  },
  IncorrectUser: {
    message: 'incorrect username or password!',
    httpStatus: 401,
  },
  IncorrectName: {
    message: 'user already exists',
    httpStatus: 409,
  },
  idInvalid: {
    message: 'Object not found',
    httpStatus: 404,
  },
  IncorrectData: {
    message: 'data already exists',
    httpStatus: 409,
  }
};

export default ErrorTypes;
