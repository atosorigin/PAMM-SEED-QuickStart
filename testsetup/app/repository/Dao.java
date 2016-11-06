package repository;

import play.Logger;

import javax.inject.Inject;
import java.util.Arrays;

public class Dao {
    public static final String SUCCESS = "SUCCESS";
    public static final String ERROR = "ERROR";

    private static final Logger.ALogger LOG = Logger.of(Dao.class);
    private final EntityManagerProvider emp;

    @Inject
    public Dao(EntityManagerProvider emp) {
        this.emp = emp;
    }

    public final String executeUpdate(final String script) {
        try {
            final String sql = script.replaceAll("(\\r|\\n)", " ");
            Arrays.stream(sql.split(";"))
                .forEach(statement -> emp.getEntityManager().createNativeQuery(statement + ";").executeUpdate());

            return SUCCESS;
        } catch (Exception e) {
            LOG.error("Error executing update SQL", e);
            return ERROR;
        }
    }

    public final String executeQuery(final String script) {
        try {
            final String sql = script.replaceAll("(\\r|\\n)", " ");
            return emp.getEntityManager().createNativeQuery(sql).getSingleResult().toString();
        } catch (Exception e) {
            LOG.error("Error executing update SQL", e);
            return ERROR;
        }
    }
}
