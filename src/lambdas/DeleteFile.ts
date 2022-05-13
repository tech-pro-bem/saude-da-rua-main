import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DeleteFileValidation } from '../utils/validations/fileValidations';
import deleteFileUseCase from '../useCases/deleteFile';

type TParsedFromEventQueryString = {
    [name: string]: any;
}

type IPayloadDeleteFileValidation = {
    fileId: string;
}

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const response: APIGatewayProxyResult = {
        isBase64Encoded: false,
        statusCode: 204,
        headers: {
            'content-type': 'application/json',
        },
        body: '',
    };

    const parsedQueryString: TParsedFromEventQueryString = event.queryStringParameters;

    try {
        const deleteFileValidation = new DeleteFileValidation(parsedQueryString);

        const deleteFilePayloadValidated: IPayloadDeleteFileValidation =
            await deleteFileValidation.validateInput();

        await deleteFileUseCase.execute(deleteFilePayloadValidated);

        response.body = JSON.stringify({
            mainMessage: 'File deleted successfully'
        })

    } catch (error) {
        response.statusCode = error.code;
        response.body = JSON.stringify({
            errorClassName: error.name,
            generalErrorMessage: error.generalErrorMessage,
            mainErrorMessage: error.mainErrorMessage,
        });
    }

    return response;
};
