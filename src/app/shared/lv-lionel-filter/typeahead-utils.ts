import { latinMap } from './latin-map';

export class TypeaheadUtils {
    
    public static typeaheadWordDelimiters:string = ' ';
    public static typeaheadPhraseDelimiters:string = '\'"';

    public static latinMap: any = latinMap;

    public static latinize(str: string): string {
        return str.replace(/[^A-Za-z0-9\[\] ]/g, function (a: string): string {
            return TypeaheadUtils.latinMap[a] || a;
        });
    }

    public static escapeRegexp(queryToEscape: string): string {
        // Regex: capture the whole query string and replace it with the string
        // that will be used to match the results, for example if the capture is
        // 'a' the result will be \a
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }

    /* tslint:disable */
    public static tokenize(str: string, wordRegexDelimiters = ' ', phraseRegexDelimiters = ''): Array<string> {
        /* tslint:enable */
        let regexStr: string = '(?:[' + phraseRegexDelimiters + '])([^' + phraseRegexDelimiters + ']+)(?:[' + phraseRegexDelimiters + '])|([^' + wordRegexDelimiters + ']+)';
        let preTokenized: Array<string> = str.split(new RegExp(regexStr, 'g'));
        let result: Array<string> = [];
        let preTokenizedLength: number = preTokenized.length;
        let token: string;
        let replacePhraseDelimiters = new RegExp('[' + phraseRegexDelimiters + ']+', 'g');

        for (let i = 0; i < preTokenizedLength; i += 1) {
            token = preTokenized[i];
            if (token && token.length && token !== wordRegexDelimiters) {
                result.push(token.replace(replacePhraseDelimiters, ''));
            }
        }

        return result;
    }

    public static normalizeQuery = (value: string): any => {
        // If singleWords, break model here to not be doing extra work on each iteration
        let normalizedQuery: any =
            TypeaheadUtils.latinize(value)
                .toString()
                .toLowerCase();
                
        normalizedQuery = TypeaheadUtils.tokenize(normalizedQuery, 
            TypeaheadUtils.typeaheadWordDelimiters, 
            TypeaheadUtils.typeaheadPhraseDelimiters);

        return normalizedQuery;
    }

    public static testMatch = (match: string, test: any): boolean => {
        let spaceLength: number;

        if (typeof test === 'object') {
            spaceLength = test.length;
            for (let i = 0; i < spaceLength; i += 1) {
                if (test[i].length > 0 && match.indexOf(test[i]) < 0) {
                    return false;
                }
            }
            return true;
        } else {
            return match.indexOf(test) >= 0;
        }
    }
    
    public static filterTypeahead = (data, typeaheadOptionField, value) => {
    
        let normalizedQuery = TypeaheadUtils.normalizeQuery(value);

        return data.filter((option:any) => {
            return option && TypeaheadUtils.testMatch(
                TypeaheadUtils.prepareOption(option, typeaheadOptionField).toLowerCase(), normalizedQuery);
          });    
    }
    
    private static prepareOption(option: any, typeaheadOptionField: string): any {
        let match: any;

        if (typeof option === 'object' &&
            option[typeaheadOptionField]) {
            match = TypeaheadUtils.latinize(option[typeaheadOptionField].toString());
        }

        if (typeof option === 'string') {
            match = TypeaheadUtils.latinize(option.toString());
        }

        return match;
    }

    
}
