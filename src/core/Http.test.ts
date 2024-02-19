import {HTTPTransport, TResult} from "./Http";
import sinon, {SinonStub} from "sinon";
import {assert} from "chai";

describe('HttpTransport', () => {
    let http: HTTPTransport;
    let stubRequest: SinonStub;

    beforeEach(() => {
        http = new HTTPTransport('/test');
        stubRequest = sinon.stub(http,'request').callsFake( () => Promise.resolve<TResult<string>>({status: 200, data: "lala"}))
    });

    afterEach(() => {
        sinon.restore();
    })

    it('get should get request', () => {
        http.get('/url');
        assert(stubRequest.calledOnce);
        assert(stubRequest.calledWithMatch('/url'));
    });

    it('put should put request', () => {
        http.put('/url');
        assert(stubRequest.calledOnce);
        assert(stubRequest.calledWithMatch('/url'));
    });

    it('post should POST request', () => {
        http.post('/url');
        assert(stubRequest.calledOnce);
        assert(stubRequest.calledWithMatch('/url'));
    });

    it('delete should Delete request', () => {
        http.delete('/url');
        assert(stubRequest.calledOnce);
        assert(stubRequest.calledWithMatch('/url'));
    });
})
