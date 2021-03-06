'use es6';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
const expect = chai.expect;

import { List } from 'immutable';

import PickupTimeEstimateTranslator from '../../../../src/services/translators/estimates/PickupTimeEstimateTranslator';
import PickupTimeEstimatesTranslator from '../../../../src/services/translators/estimates/PickupTimeEstimatesTranslator';

describe('Trip Duration Estimats Translation', function() {
  const testValue = 'jaebaebae';

  const estimateTranslator = new PickupTimeEstimateTranslator();
  const translator = new PickupTimeEstimatesTranslator(estimateTranslator);

  let valid = {};
  valid[PickupTimeEstimatesTranslator.getEstimatedDurationsFieldName()] = [
    1, 2, 3
  ];

  describe('Estimates Validation', () => {

    describe('Valid Estimates', () => {
      it('is valid', () => {
        expect(translator.isValid(valid)).to.be.true;
      });
    });

    describe('Invalid Estimates', () => {
      let invalid = {};

      afterEach(() => {
        expect(translator.isValid(invalid)).to.be.false;
      });

      it('is invalid due to missing estimated durations field', () => {
      });

      it('is invalid due to invalid type for estimated durations field', () => {
        invalid[PickupTimeEstimatesTranslator.getEstimatedDurationsFieldName()] = testValue;
      });
    });
  });

  describe('Translation', () => {
    it('Throws when JSON is invalid', () => {
      const isValid = sinon.stub(translator, 'isValid').returns(false);
      expect(() => translator.translate({})).to.throw(Error);
      isValid.restore();
    });

    it('Returns list when JSON is Valid', () => {
      const translateEstimate = sinon.stub(estimateTranslator, 'translate')
                                     .callsFake(() => 'bar');
      const isValid = sinon.stub(translator, 'isValid')
                           .returns(true);
      const expected = List.of('bar', 'bar', 'bar');
      expect(translator.translate(valid)).to.eql(expected);
      translateEstimate.restore();
      isValid.restore();
    });
  });
});
