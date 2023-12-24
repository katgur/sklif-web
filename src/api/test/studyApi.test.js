import { getAll, getById, getInfo, postComment } from '../studyApi';
import { serverUrl, protocol } from '../../util/config';
import request from '../client';

jest.mock('axios');
jest.mock('../client');
const url = `${protocol}://${serverUrl}/organization-management/api`;

const study = {
    "key": "HSE/HSE/1234",
    "imagesCount": 26,
    "keys": [
        "string"
    ],
    "studyId": "1",
    "studyDescription": "MIBS HEAD^BRAIN",
    "studyDate": "20190121",
    "studyTime": "141805.750000",
    "seriesDescription": [
        "T2 cor"
    ],
    "modality": [
        "MR"
    ],
    "dataType": "",
    "patientId": "048-001-0024477",
    "patientName": "Dmitrienko G.A.",
    "birthDate": "19990923",
    "patientAge": "019Y",
    "patientWeight": "70",
    "patientAddress": "",
    "country": "",
    "region": "",
    "telephone": "",
    "occupation": "",
    "patientComments": [
        ""
    ],
    "physicianName": "",
    "physicianAddress": "",
    "physicianPhoneNumbers": "",
    "departmentName": "",
    "performingPhysician": "Demin D.S.",
    "operatorName": "Kovaleva V.K.",
    "reviewDate": "",
    "reviewTime": "",
    "reviewerName": "",
    "textComments": [
        ""
    ],
    "globalComments": [
        "Comments that have been added manualy"
    ]
}

const studies = [
    {
        "key": "HSE/HSE/1234",
        "imagesCount": 26,
        "keys": [
            "string"
        ],
        "studyId": "1",
        "studyDescription": "MIBS HEAD^BRAIN",
        "studyDate": "20190121",
        "studyTime": "141805.750000",
        "seriesDescription": [
            "T2 cor"
        ],
        "modality": [
            "MR"
        ],
        "dataType": "",
        "patientId": "048-001-0024477",
        "patientName": "Dmitrienko G.A.",
        "birthDate": "19990923",
        "patientAge": "019Y",
        "patientWeight": "70",
        "patientAddress": "",
        "country": "",
        "region": "",
        "telephone": "",
        "occupation": "",
        "patientComments": [
            ""
        ],
        "physicianName": "",
        "physicianAddress": "",
        "physicianPhoneNumbers": "",
        "departmentName": "",
        "performingPhysician": "Demin D.S.",
        "operatorName": "Kovaleva V.K.",
        "reviewDate": "",
        "reviewTime": "",
        "reviewerName": "",
        "textComments": [
            ""
        ],
        "globalComments": [
            "Comments that have been added manualy"
        ]
    }
]

describe('study api', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('get studies', async () => {
        request.mockReturnValue(studies);
        var response = await getAll();
        expect(request).toBeCalledWith(
            { method: 'get', url: url + '/get' }
        )
        expect(response).toBe(studies)
    })

    it('get study', async () => {
        request.mockReturnValue(study);
        var response = getById({ key: 'mock' })
        expect(request).toBeCalledWith(
            { method: 'get', url: url + '/get-study', params: { key: 'mock' } }
        )
        expect(response).toBe(study);
    })

    it('post comment', async () => {
        request.mockReturnValue('comment added');
        var response = await postComment({ key: 'mock', comment: 'foo'})
        expect(request).toBeCalledWith(
            { method: 'post', url: url + '/comment', body: { key: 'mock', comment: 'foo'} }
        )
        expect(response).toBe('comment added');
    })

    it('get info', async () => {
        request.mockReturnValue(study);
        var response = await getInfo({ key: 'mock' })
        expect(request).toBeCalledWith(
            { method: 'get', url: url + '/get-info', params: { key: 'mock' } }
        )
        expect(response).toBe(study);
    })
});