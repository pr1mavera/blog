import SafeRequest from "../utils/SafeRequest";

class TopicsService {
    constructor(app) {
        this.app = app;
    }
    async getTopics() {
        return [
            { title: 'Topic 1' },
            { title: 'Topic 2' },
            { title: 'Topic 3' }
        ];
    }
}

export default TopicsService;