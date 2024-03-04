import LS from './LSRequest';
import mock1 from './assets/IM000005.dcm';
import mock2 from './assets/IM000006.dcm';
import mock3 from './assets/IM000007.dcm';
import mock4 from './assets/IM000008.dcm';

const key = 'study';

const keys = {
    'S000000/IM000005.dcm': mock1,
    'S000000/IM000006.dcm': mock2,
    'S000000/IM000007.dcm': mock3,
    'S000000/IM000008.dcm': mock4,
};

const mock = [
    {
        key: 'S000000/',
        imagesCount: 26,
        keys: Object.keys(keys),
        studyId: 1,
        studyDescription: 'MIBS HEAD^BRAIN',
        studyDate: 20190121,
        studyTime: 141805.750000,
        seriesDescription: [
            'T2 cor'
        ],
        modality: [
            'MR'
        ],
        dataType: '',
        patientId: '048-001-0024477',
        patientName: 'Patient A.B.',
        birthDate: 19990923,
        patientAge: '019Y',
        patientWeight: 70,
        patientAddress: '',
        country: '',
        region: '',
        telephone: '',
        occupation: '',
        patientComments: [
            ''
        ],
        physicianName: '',
        physicianAddress: '',
        physicianPhoneNumbers: '',
        departmentName: '',
        performingPhysician: 'Demin D.S.',
        operatorName: 'Kovaleva V.K.',
        reviewDate: '',
        reviewTime: '',
        reviewerName: '',
        textComments: [
            ''
        ],
        globalComments: [
            'Comments that have been added manualy'
        ]
    }
]

const getMockUrl = async () => {
    const urls = await Promise.all(Object.values(keys).map(mock => new Promise((resolve, reject) => {
        fetch(mock)
            .then((response) => response.blob())
            .then((blob) => URL.createObjectURL(blob))
            .then((url) => resolve(url))
            .catch((err) => reject(err));
    })))
    const res = {};
    Object.keys(keys).map((key, index) => {
        res[key] = urls[index];
    })
    return res;
}

const urls = await getMockUrl();

const getBytes = (key) => {
    return urls[key];
}

export const getData = async () => {
    return await LS.get(key, mock);
}

const setData = async (data) => {
    await LS.set(key, data);
}

const getAll = async () => {
    return await getData();
}

const getById = async (key) => {
    const data = await getData();
    return data.find(study => study.key === key);
}

const postComment = async (key, comment) => {
    const data = await getData();
    const study = data.find(study => study.key === key);
    study.globalComments = comment;
    await setData([...data.filter(d => d.key === study.key), study]);
    return study;
}

export default { getAll, getById, postComment, getBytes };