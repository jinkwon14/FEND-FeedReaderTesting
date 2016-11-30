$(function() {
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have URLs defined', function() {
            var i;
            for (i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
            }
        });

        it('have names defined', function() {
            for (i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
            }
        });
    });

    describe('The menu', function() {
        it('is hidden by default', function() {
            expect($("body").attr("class")).toBe('menu-hidden');
        });

        it('is displayed when clicked and hides when clicked again', function() {
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($("body").attr("class")).toBe("");
            menuIcon.click();
            expect($("body").attr("class")).toBe("menu-hidden");
        });
    });

    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('have at least a single ".entry" element within the ".feed" container', function(done) {
            allFeeds.forEach(function(each) {
                loadFeed(each.id, done);
                expect($('.feed .entry').length).toBeGreaterThan(0);
                done();
            });
        });

    });

    describe('New Feed Selection', function() {

        var currentFeedIndex = 0;
        var currentContent;
        var newFeedIndex = 1;
        var newContent;

        beforeEach(function(done) {
            loadFeed(currentFeedIndex, function() {
                currentContent = $('.feed').html();
                done();
            });
        });

        it('changes the content', function(done) {
            loadFeed(newFeedIndex, function() {
                newContent = $('.feed').html();
                expect(currentContent).not.toEqual(newContent);
                done();
            });
        });
    });
}());
