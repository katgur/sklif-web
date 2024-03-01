import { serverUrl, protocol } from '../../util/config';
import request from '../client';
import { deleteDirectory, deleteFile, getFiles, postDirectory } from '../storageApi';

jest.mock('axios');
jest.mock('../client');
const url = `${protocol}://${serverUrl}/organization-management/api/s3/local`;

const files = [
    {
        "bucketName": "news-platform-user-images",
        "key": "HSE/",
        "size": 0,
        "lastModified": "2023-04-21T19:47:55.376+00:00",
        "storageClass": "STANDARD",
        "etag": "d41d8cd98f00b204e9800998ecf8427e"
    }
]

describe('storage api', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('get files', async () => {
        request.mockReturnValue(files);
        var response = await getFiles();
        expect(request).toBeCalledWith(
            { method: 'get', url: url + '/get' }
        )
        expect(response).toBe(files);
    })

    it('delete file', async () => {
        request.mockReturnValue('deleted files');
        var response = await deleteFile({ fileNames: ['foo', 'bar'] })
        expect(request).toBeCalledWith(
            { method: 'delete', url: url + '/delete', body: { fileNames: ['foo', 'bar'] } }
        )
        expect(response).toBe('deleted files');
    })

    it('post dir', async () => {
        request.mockReturnValue('dir created');
        var response = await postDirectory({ path: 'mock' })
        expect(request).toBeCalledWith(
            { method: 'post', url: url + '/create-folder', params: { path: 'mock' } }
        )
        expect(response).toBe('dir created');
    })

    it('delete dir', async () => {
        request.mockReturnValue('dir deleted');
        var response = await deleteDirectory({ folderName: 'mock' })
        expect(request).toBeCalledWith(
            { method: 'delete', url: url + '/delete-folder', params: { folderName: 'mock' } }
        )
        expect(response).toBe('dir deleted');
    })
});