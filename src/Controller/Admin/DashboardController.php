<?php

namespace App\Controller\Admin;

use App\Entity\Lesson;
use App\Entity\User;
use App\Entity\UserLesson;
use EasyCorp\Bundle\EasyAdminBundle\Attribute\AdminDashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\HttpFoundation\Response;

#[AdminDashboard(routePath: '/admin', routeName: 'admin')]
class DashboardController extends AbstractDashboardController
{
    public function index(): Response
    {
        $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);
        return $this->redirect($adminUrlGenerator->setController(UserCrudController::class)->generateUrl());
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Edusign Sf');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToCrud('Élèves', 'fas fa-users', User::class);
        yield MenuItem::linkToCrud('Cours', 'fas fa-book', Lesson::class);
        yield MenuItem::linkToCrud('Présence aux cours', 'fas fa-book-open', UserLesson::class);
    }
}
