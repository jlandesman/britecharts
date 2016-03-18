define([
    'underscore',
    'jquery',
    'd3',
    'sparkline',
    'sparklineDataBuilder'
    ], function(
        _,
        $,
        d3,
        sparkline,
        dataBuilder
    ) {
    'use strict';

    describe('Reusable Sparkline Chart', () => {
        let dataset, containerFixture, f, sparklineChart;

        function aTestDataSet() {
            return new dataBuilder.SparklineDataBuilder();
        }

        function hasClass(element, className) {
            return _.contains(element[0][0].classList, className);
        }

        beforeEach(() => {
            dataset = aTestDataSet().with1Source().build();
            sparklineChart = sparkline();

            // DOM Fixture Setup
            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');

            containerFixture = d3.select('.test-container').append('svg');
            containerFixture.datum(dataset.data).call(sparklineChart);
        });

        afterEach(() => {
            containerFixture.remove();
            f = jasmine.getFixtures();
            f.cleanUp();
            f.clearCache();
        });

        it('should render a sparkline chart with minimal requirements', () =>  {
            expect(containerFixture.select('.line').empty()).toBeFalsy();
        });

        it('should render container and chart groups', () => {
            expect(containerFixture.select('g.container-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.chart-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.metadata-group').empty()).toBeFalsy();
        });

        it('should render a sparkline', () => {
            expect(containerFixture.selectAll('.sparkline')[0].length).toEqual(1);
        });


        // API
        it('should provide margin getter and setter', () => {
            let defaultMargin = sparklineChart.margin(),
                testMargin = {top: 4, right: 4, bottom: 4, left: 4},
                newMargin;

            sparklineChart.margin(testMargin);
            newMargin = sparklineChart.margin();

            expect(defaultMargin).not.toBe(testMargin);
            expect(newMargin).toBe(testMargin);
        });

        it('should provide width getter and setter', () => {
            let defaultWidth = sparklineChart.width(),
                testWidth = 200,
                newWidth;

            sparklineChart.width(testWidth);
            newWidth = sparklineChart.width();

            expect(defaultWidth).not.toBe(testWidth);
            expect(newWidth).toBe(testWidth);
        });

        it('should provide height getter and setter', () => {
            let defaultHeight = sparklineChart.height(),
                testHeight = 200,
                newHeight;

            sparklineChart.height(testHeight);
            newHeight = sparklineChart.height();

            expect(defaultHeight).not.toBe(testHeight);
            expect(newHeight).toBe(testHeight);
        });

        it('should provide valueLabel getter and setter', () => {
            let defaultValueLabel = sparklineChart.valueLabel(),
                testValueLabel = 'quantity',
                newValueLabel;

            sparklineChart.valueLabel(testValueLabel);
            newValueLabel = sparklineChart.valueLabel();

            expect(defaultValueLabel).not.toBe(testValueLabel);
            expect(newValueLabel).toBe(testValueLabel);
        });

        it('should provide dateLabel getter and setter', () => {
            let defaultDateLabel = sparklineChart.dateLabel(),
                testDateLabel = 'dateUTC',
                newDateLabel;

            sparklineChart.valueLabel(testDateLabel);
            newDateLabel = sparklineChart.valueLabel();

            expect(defaultDateLabel).not.toBe(testDateLabel);
            expect(newDateLabel).toBe(testDateLabel);
        });
    });
});
