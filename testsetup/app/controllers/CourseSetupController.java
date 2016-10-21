package controllers;

import play.mvc.Controller;
import play.mvc.Result;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.ArrayList;

public class CourseSetupController extends Controller {
    private static final String COURSE_LOCATION = System.getProperty("user.home") + File.separator + "ddu-072" + File.separator;

    public Result createCourse(String category, String courseName) {
        try {
            Files.createDirectories(Paths.get(COURSE_LOCATION + category));
            Files.createDirectories(Paths.get(COURSE_LOCATION + category + File.separator + courseName));


            final ArrayList<String> courseContent = new ArrayList<>();
            courseContent.add("{\"name\": \"" + courseName + "\", \"description\": \"Test Course\"}");

            final Path courseJson = Paths.get(COURSE_LOCATION + category + File.separator + courseName +  File.separator + "course.json");
            Files.write(courseJson, courseContent, Charset.forName("UTF-8"));

            return ok("[Created Course] " + COURSE_LOCATION + category + File.separator + courseName +  File.separator + "course.json");
        } catch (IOException e) {
            return internalServerError(e.toString());
        }
    }

    public Result deleteCategory(String category) {
        try {
            deleteDir(COURSE_LOCATION + category);
            return ok("[Delete Category] " + COURSE_LOCATION + category );
        } catch (IOException e) {
            return internalServerError(e.toString());
        }
    }

    public Result deleteCourse(String category, String courseName) {
        try {
            deleteDir(COURSE_LOCATION + category  + File.separator + courseName);
            return ok("[DELETED COURSE] " + COURSE_LOCATION + category  + File.separator + courseName);
        } catch (IOException e) {
            return internalServerError(e.toString());
        }
    }

    private void deleteDir(String directoryToDelete) throws IOException {
        final Path directory = Paths.get(directoryToDelete);
        Files.walkFileTree(directory, new SimpleFileVisitor<Path>() {
            @Override
            public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                Files.delete(file);
                return FileVisitResult.CONTINUE;
            }

            @Override
            public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
                Files.delete(dir);
                return FileVisitResult.CONTINUE;
            }
        });
    }
}
