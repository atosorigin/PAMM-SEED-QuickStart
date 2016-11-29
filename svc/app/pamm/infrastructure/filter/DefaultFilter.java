package pamm.infrastructure.filter;

import play.filters.gzip.GzipFilter;
import play.filters.headers.SecurityHeadersFilter;
import play.mvc.EssentialFilter;
import play.http.HttpFilters;
import javax.inject.Inject;

public class DefaultFilter implements HttpFilters{

    private final GzipFilter gzip;
    private SecurityHeadersFilter securityHeadersFilter;

    @Inject
    public DefaultFilter(final GzipFilter gzip,
                         final SecurityHeadersFilter securityHeadersFilter) {
        this.gzip = gzip;
        this.securityHeadersFilter = securityHeadersFilter;
    }

    @Override
    public EssentialFilter[] filters() {
        return new EssentialFilter[] {
                gzip.asJava(),
                securityHeadersFilter.asJava()
        };
    }

}